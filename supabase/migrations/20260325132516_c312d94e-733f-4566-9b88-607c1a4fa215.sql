-- Create account type enum
CREATE TYPE public.account_type AS ENUM ('personal', 'company');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type account_type NOT NULL DEFAULT 'personal',
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  country TEXT,
  city TEXT,
  company_name TEXT,
  tax_id TEXT,
  business_field TEXT,
  employee_count TEXT,
  contact_person_name TEXT,
  contact_person_position TEXT,
  company_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, account_type, first_name, last_name, phone, country, city, company_name, tax_id, business_field, employee_count, contact_person_name, contact_person_position, company_address)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'account_type')::account_type, 'personal'),
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'country',
    NEW.raw_user_meta_data->>'city',
    NEW.raw_user_meta_data->>'company_name',
    NEW.raw_user_meta_data->>'tax_id',
    NEW.raw_user_meta_data->>'business_field',
    NEW.raw_user_meta_data->>'employee_count',
    NEW.raw_user_meta_data->>'contact_person_name',
    NEW.raw_user_meta_data->>'contact_person_position',
    NEW.raw_user_meta_data->>'company_address'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();