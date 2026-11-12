import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Check, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const features = [
  "Limitsiz təklif yerləşdirmə",
  "Prioritet axtarışda görünmə",
  "Premium sarı nişan profilinizdə",
  "24/7 öncəlikli dəstək",
  "Detallı analitika və statistika",
  "Komissiyasız sifarişlər",
];

const PremiumDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      toast({ title: "Giriş tələb olunur", description: "Premium almaq üçün daxil olun" });
      navigate("/auth");
      return;
    }
    setOpen(true);
  };

  const handleSubscribe = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Tezliklə!",
        description: "Ödəniş sistemi qurulur. Yaxın günlərdə Premium funksiyaları aktiv olacaq.",
      });
      setOpen(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleClick}
          size="sm"
          variant="ghost"
          className="gap-1.5 text-orange hover:bg-orange/10 hover:text-orange"
        >
          <Crown className="h-3.5 w-3.5" /> Premium
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-primary/5 pointer-events-none" />
        <DialogHeader className="relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mx-auto p-3 rounded-full bg-gradient-to-br from-orange to-orange/70 w-fit mb-3"
          >
            <Crown className="h-8 w-8 text-orange-foreground" />
          </motion.div>
          <DialogTitle className="font-display text-2xl text-center">LogiTech Premium</DialogTitle>
          <p className="text-center text-muted-foreground text-sm">Bizneziniz üçün tam güc</p>
        </DialogHeader>

        <div className="text-center py-2 relative">
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-display text-5xl font-bold text-navy">$59.99</span>
            <span className="text-muted-foreground">/ay</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">İstədiyin vaxt ləğv et</p>
        </div>

        <ul className="space-y-2.5 py-3 relative">
          {features.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2.5 text-sm"
            >
              <div className="p-1 rounded-full bg-green/10">
                <Check className="h-3.5 w-3.5 text-green" />
              </div>
              {f}
            </motion.li>
          ))}
        </ul>

        <Button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange to-orange/70 text-orange-foreground hover:opacity-90 gap-2 relative"
          size="lg"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Sparkles className="h-4 w-4" /> Premium-a yüksəlt</>}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumDialog;
