
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  module_type TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Mövcud',
  owner_name TEXT,
  details TEXT[],
  rating NUMERIC(2,1) DEFAULT 5.0,
  description TEXT,
  contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view listings" ON public.listings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create listings" ON public.listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own listings" ON public.listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own listings" ON public.listings FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON public.listings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_listings_module_type ON public.listings(module_type);
CREATE INDEX idx_listings_user_id ON public.listings(user_id);

CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  sender_name TEXT NOT NULL,
  sender_phone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sent inquiries" ON public.inquiries FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Authenticated users can send inquiries" ON public.inquiries FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Receivers can update inquiry status" ON public.inquiries FOR UPDATE USING (auth.uid() = receiver_id);

CREATE INDEX idx_inquiries_listing_id ON public.inquiries(listing_id);
CREATE INDEX idx_inquiries_receiver_id ON public.inquiries(receiver_id);

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_premium BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS premium_until TIMESTAMPTZ;
