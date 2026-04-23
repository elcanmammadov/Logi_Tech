import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  listingId: string;
  listingTitle: string;
  ownerUserId?: string;
  trigger: ReactNode;
}

const InquiryDialog = ({ listingId, listingTitle, ownerUserId, trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(`"${listingTitle}" təklifi ilə maraqlanıram. Əlavə məlumat verə bilərsinizmi?`);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleOpen = (next: boolean) => {
    if (next && !user) {
      toast({ title: "Giriş tələb olunur", description: "Sifariş göndərmək üçün daxil olun" });
      navigate("/auth");
      return;
    }
    setOpen(next);
    if (next && user) {
      setName(
        user.user_metadata?.company_name ||
        `${user.user_metadata?.first_name ?? ""} ${user.user_metadata?.last_name ?? ""}`.trim() ||
        ""
      );
      setPhone(user.user_metadata?.phone || "");
    }
  };

  const handleSubmit = async () => {
    if (!user || !ownerUserId) {
      toast({ title: "Xəta", description: "Bu mock təklif üçün sifariş göndərilə bilməz. Yeni real təklifə sifariş verin.", variant: "destructive" });
      return;
    }
    if (!name || !message) {
      toast({ title: "Xəta", description: "Ad və mesaj vacibdir", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("inquiries").insert({
      listing_id: listingId,
      sender_id: user.id,
      receiver_id: ownerUserId,
      sender_name: name,
      sender_phone: phone || null,
      message,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Xəta", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Sifarişiniz göndərildi!", description: "Təklif sahibi tezliklə sizinlə əlaqə saxlayacaq." });
    setOpen(false);
    setMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Sifariş et</DialogTitle>
          <DialogDescription>{listingTitle}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Adınız *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Telefon</Label>
            <Input placeholder="+994 XX XXX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Mesajınız *</Label>
            <Textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Ləğv et</Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-orange hover:bg-orange/90 text-orange-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Göndər"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryDialog;
