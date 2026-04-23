import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Building2, ArrowLeft, ArrowRight, Mail, Lock, Phone, MapPin, Globe, FileText, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logicoo-logo.jpeg";

type AccountType = "personal" | "company" | null;
type AuthMode = "login" | "register";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Personal state
  const [pFirstName, setPFirstName] = useState("");
  const [pLastName, setPLastName] = useState("");
  const [pEmail, setPEmail] = useState("");
  const [pPhone, setPPhone] = useState("");
  const [pPassword, setPPassword] = useState("");
  const [pConfirmPassword, setPConfirmPassword] = useState("");
  const [pCountry, setPCountry] = useState("");
  const [pCity, setPCity] = useState("");

  // Company state
  const [cCompanyName, setCCompanyName] = useState("");
  const [cTaxId, setCTaxId] = useState("");
  const [cBusinessField, setCBusinessField] = useState("");
  const [cEmployeeCount, setCEmployeeCount] = useState("");
  const [cContactName, setCContactName] = useState("");
  const [cContactPosition, setCContactPosition] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [cConfirmPassword, setCConfirmPassword] = useState("");
  const [cCountry, setCCountry] = useState("");
  const [cAddress, setCAddress] = useState("");

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      toast({ title: "Xəta", description: "E-poçt və şifrə daxil edin", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
    setLoading(false);
    if (error) {
      toast({ title: "Giriş xətası", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Uğurlu!", description: "Hesabınıza daxil oldunuz" });
      navigate("/");
    }
  };

  const handlePersonalRegister = async () => {
    if (pPassword !== pConfirmPassword) {
      toast({ title: "Xəta", description: "Şifrələr uyğun gəlmir", variant: "destructive" });
      return;
    }
    if (pPassword.length < 8) {
      toast({ title: "Xəta", description: "Şifrə minimum 8 simvol olmalıdır", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: pEmail,
      password: pPassword,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          account_type: "personal",
          first_name: pFirstName,
          last_name: pLastName,
          phone: pPhone,
          country: pCountry,
          city: pCity,
        },
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Qeydiyyat xətası", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Uğurlu!", description: "Qeydiyyat tamamlandı. E-poçtunuzu yoxlayın." });
      navigate("/");
    }
  };

  const handleCompanyRegister = async () => {
    if (cPassword !== cConfirmPassword) {
      toast({ title: "Xəta", description: "Şifrələr uyğun gəlmir", variant: "destructive" });
      return;
    }
    if (cPassword.length < 8) {
      toast({ title: "Xəta", description: "Şifrə minimum 8 simvol olmalıdır", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: cEmail,
      password: cPassword,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          account_type: "company",
          company_name: cCompanyName,
          tax_id: cTaxId,
          business_field: cBusinessField,
          employee_count: cEmployeeCount,
          contact_person_name: cContactName,
          contact_person_position: cContactPosition,
          phone: cPhone,
          country: cCountry,
          company_address: cAddress,
        },
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Qeydiyyat xətası", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Uğurlu!", description: "Şirkət qeydiyyatı tamamlandı. E-poçtunuzu yoxlayın." });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <motion.div className="absolute inset-0 opacity-10" initial={{ opacity: 0 }} animate={{ opacity: 0.1 }}>
        <motion.div animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-20 left-20 w-80 h-80 bg-orange rounded-full blur-[150px]" />
        <motion.div animate={{ scale: [1, 1.2, 1], y: [0, -40, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-[180px]" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md relative z-10">
        {/* Logo */}
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link to="/" className="inline-flex items-center gap-3 mb-2">
            <motion.img src={logo} alt="LogiTech" className="h-12 w-12 object-contain" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} />
            <span className="font-display font-bold text-2xl text-navy-foreground">LogiTech</span>
          </Link>
        </motion.div>

        <Card className="border-none shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-display text-2xl">
              {mode === "login" ? "Daxil Ol" : "Qeydiyyat"}
            </CardTitle>
            <CardDescription>
              {mode === "login"
                ? "Hesabınıza daxil olun"
                : accountType === null
                  ? "Hesab növünü seçin"
                  : accountType === "personal"
                    ? `Şəxsi hesab — Addım ${step}/2`
                    : `Şirkət hesabı — Addım ${step}/3`
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-poçt</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="sizin@email.com" className="pl-10" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Şifrə</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button onClick={handleLogin} disabled={loading} className="w-full bg-orange hover:bg-orange/90 text-orange-foreground">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Daxil Ol"}
                  </Button>
                </motion.div>
              ) : accountType === null ? (
                <motion.div key="type-select" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="grid grid-cols-2 gap-4">
                  {[
                    { type: "personal" as const, icon: User, title: "Şəxsi", desc: "Fərdi istifadəçi hesabı" },
                    { type: "company" as const, icon: Building2, title: "Şirkət", desc: "Biznes hesabı" },
                  ].map((opt) => (
                    <motion.button key={opt.type} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setAccountType(opt.type); setStep(1); }}
                      className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all">
                      <div className="p-3 rounded-full bg-primary/10"><opt.icon className="h-8 w-8 text-primary" /></div>
                      <div className="text-center">
                        <div className="font-display font-semibold">{opt.title}</div>
                        <div className="text-xs text-muted-foreground">{opt.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : accountType === "personal" ? (
                <PersonalForm
                  step={step} setStep={setStep} showPassword={showPassword} setShowPassword={setShowPassword}
                  loading={loading} onSubmit={handlePersonalRegister}
                  firstName={pFirstName} setFirstName={setPFirstName}
                  lastName={pLastName} setLastName={setPLastName}
                  email={pEmail} setEmail={setPEmail}
                  phone={pPhone} setPhone={setPPhone}
                  password={pPassword} setPassword={setPPassword}
                  confirmPassword={pConfirmPassword} setConfirmPassword={setPConfirmPassword}
                  country={pCountry} setCountry={setPCountry}
                  city={pCity} setCity={setPCity}
                />
              ) : (
                <CompanyForm
                  step={step} setStep={setStep} showPassword={showPassword} setShowPassword={setShowPassword}
                  loading={loading} onSubmit={handleCompanyRegister}
                  companyName={cCompanyName} setCompanyName={setCCompanyName}
                  taxId={cTaxId} setTaxId={setCTaxId}
                  businessField={cBusinessField} setBusinessField={setCBusinessField}
                  employeeCount={cEmployeeCount} setEmployeeCount={setCEmployeeCount}
                  contactName={cContactName} setContactName={setCContactName}
                  contactPosition={cContactPosition} setContactPosition={setCContactPosition}
                  email={cEmail} setEmail={setCEmail}
                  phone={cPhone} setPhone={setCPhone}
                  password={cPassword} setPassword={setCPassword}
                  confirmPassword={cConfirmPassword} setConfirmPassword={setCConfirmPassword}
                  country={cCountry} setCountry={setCCountry}
                  address={cAddress} setAddress={setCAddress}
                />
              )}
            </AnimatePresence>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <>Hesabınız yoxdur?{" "}<button onClick={() => { setMode("register"); setAccountType(null); setStep(1); }} className="text-primary font-medium hover:underline">Qeydiyyatdan keçin</button></>
              ) : (
                <>Artıq hesabınız var?{" "}<button onClick={() => { setMode("login"); setAccountType(null); setStep(1); }} className="text-primary font-medium hover:underline">Daxil olun</button></>
              )}
            </div>

            {mode === "register" && accountType !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center">
                <button onClick={() => { setAccountType(null); setStep(1); }} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> Hesab növünü dəyiş
                </button>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-6">
          <Link to="/" className="text-sm text-navy-foreground/50 hover:text-navy-foreground inline-flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Ana Səhifəyə qayıt
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ======================== PERSONAL FORM ======================== */
const PersonalForm = ({ step, setStep, showPassword, setShowPassword, loading, onSubmit,
  firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone,
  password, setPassword, confirmPassword, setConfirmPassword, country, setCountry, city, setCity,
}: {
  step: number; setStep: (s: number) => void;
  showPassword: boolean; setShowPassword: (v: boolean) => void;
  loading: boolean; onSubmit: () => void;
  firstName: string; setFirstName: (v: string) => void;
  lastName: string; setLastName: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  confirmPassword: string; setConfirmPassword: (v: string) => void;
  country: string; setCountry: (v: string) => void;
  city: string; setCity: (v: string) => void;
}) => (
  <AnimatePresence mode="wait">
    {step === 1 ? (
      <motion.div key="p1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2"><Label>Ad</Label><Input placeholder="Adınız" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
          <div className="space-y-2"><Label>Soyad</Label><Input placeholder="Soyadınız" value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
        </div>
        <div className="space-y-2"><Label>E-poçt</Label><div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input type="email" placeholder="sizin@email.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} /></div></div>
        <div className="space-y-2"><Label>Telefon</Label><div className="relative"><Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input type="tel" placeholder="+994 XX XXX XX XX" className="pl-10" value={phone} onChange={(e) => setPhone(e.target.value)} /></div></div>
        <Button onClick={() => setStep(2)} className="w-full bg-primary gap-2">Növbəti <ArrowRight className="h-4 w-4" /></Button>
      </motion.div>
    ) : (
      <motion.div key="p2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
        <div className="space-y-2"><Label>Şifrə</Label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input type={showPassword ? "text" : "password"} placeholder="Minimum 8 simvol" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
        <div className="space-y-2"><Label>Şifrəni təsdiqlə</Label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input type={showPassword ? "text" : "password"} placeholder="Şifrəni yenidən yazın" className="pl-10" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div></div>
        <div className="space-y-2"><Label>Ölkə</Label><div className="relative"><Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="Azərbaycan" className="pl-10" value={country} onChange={(e) => setCountry(e.target.value)} /></div></div>
        <div className="space-y-2"><Label>Şəhər</Label><div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="Bakı" className="pl-10" value={city} onChange={(e) => setCity(e.target.value)} /></div></div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setStep(1)} className="flex-1 gap-1"><ArrowLeft className="h-4 w-4" /> Geri</Button>
          <Button onClick={onSubmit} disabled={loading} className="flex-1 bg-orange hover:bg-orange/90 text-orange-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Qeydiyyat"}
          </Button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ======================== COMPANY FORM ======================== */
const CompanyForm = ({ step, setStep, showPassword, setShowPassword, loading, onSubmit,
  companyName, setCompanyName, taxId, setTaxId, businessField, setBusinessField,
  employeeCount, setEmployeeCount, contactName, setContactName, contactPosition, setContactPosition,
  email, setEmail, phone, setPhone, password, setPassword, confirmPassword, setConfirmPassword,
  country, setCountry, address, setAddress,
}: {
  step: number; setStep: (s: number) => void;
  showPassword: boolean; setShowPassword: (v: boolean) => void;
  loading: boolean; onSubmit: () => void;
  companyName: string; setCompanyName: (v: string) => void;
  taxId: string; setTaxId: (v: string) => void;
  businessField: string; setBusinessField: (v: string) => void;
  employeeCount: string; setEmployeeCount: (v: string) => void;
  contactName: string; setContactName: (v: string) => void;
  contactPosition: string; setContactPosition: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  confirmPassword: string; setConfirmPassword: (v: string) => void;
  country: string; setCountry: (v: string) => void;
  address: string; setAddress: (v: string) => void;
}) => (
  <AnimatePresence mode="wait">
    {step === 1 ? (
      <motion.div key="c1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
        <div className="space-y-2"><Label>Şirkətin adı</Label><div className="relative"><Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="Şirkət adı" className="pl-10" value={companyName} onChange={(e) => setCompanyName(e.target.value)} /></div></div>
        <div className="space-y-2"><Label>VÖEN (Vergi nömrəsi)</Label><div className="relative"><FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="1234567890" className="pl-10" value={taxId} onChange={(e) => setTaxId(e.target.value)} /></div></div>
        <div className="space-y-2"><Label>Fəaliyyət sahəsi</Label><Input placeholder="Beynəlxalq yük daşıma" value={businessField} onChange={(e) => setBusinessField(e.target.value)} /></div>
        <div className="space-y-2"><Label>İşçi sayı</Label><Input placeholder="10-50" value={employeeCount} onChange={(e) => setEmployeeCount(e.target.value)} /></div>
        <Button onClick={() => setStep(2)} className="w-full bg-primary gap-2">Növbəti <ArrowRight className="h-4 w-4" /></Button>
      </motion.div>
    ) : step === 2 ? (
      <motion.div key="c2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
        <div className="space-y-2"><Label>Əlaqədar şəxsin adı</Label><div className="relative"><User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="Ad Soyad" className="pl-10" value={contactName} onChange={(e) => setContactName(e.target.value)} /></div></div>
        <div className="space-y-2"><Label>Vəzifə</Label><Input placeholder="Direktor / Menecer" value={contactPosition} onChange={(e) => setContactPosition(e.target.value)} /></div>
        <div className="space-y-2"><Label>E-poçt</Label><div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input type="email" placeholder="info@company.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} /></div></div>
        <div className="space-y-2"><Label>Telefon</Label><div className="relative"><Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input type="tel" placeholder="+994 XX XXX XX XX" className="pl-10" value={phone} onChange={(e) => setPhone(e.target.value)} /></div></div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setStep(1)} className="flex-1 gap-1"><ArrowLeft className="h-4 w-4" /> Geri</Button>
          <Button onClick={() => setStep(3)} className="flex-1 bg-primary gap-2">Növbəti <ArrowRight className="h-4 w-4" /></Button>
        </div>
      </motion.div>
    ) : (
      <motion.div key="c3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
        <div className="space-y-2"><Label>Şifrə</Label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input type={showPassword ? "text" : "password"} placeholder="Minimum 8 simvol" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
        <div className="space-y-2"><Label>Şifrəni təsdiqlə</Label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input type={showPassword ? "text" : "password"} placeholder="Şifrəni yenidən yazın" className="pl-10" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div></div>
        <div className="space-y-2"><Label>Ölkə</Label><div className="relative"><Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="Azərbaycan" className="pl-10" value={country} onChange={(e) => setCountry(e.target.value)} /></div></div>
        <div className="space-y-2"><Label>Şəhər / Ünvan</Label><div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="Bakı, Nəsimi r." className="pl-10" value={address} onChange={(e) => setAddress(e.target.value)} /></div></div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setStep(2)} className="flex-1 gap-1"><ArrowLeft className="h-4 w-4" /> Geri</Button>
          <Button onClick={onSubmit} disabled={loading} className="flex-1 bg-orange hover:bg-orange/90 text-orange-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Qeydiyyat"}
          </Button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Auth;
