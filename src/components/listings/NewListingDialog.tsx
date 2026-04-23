import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface NewListingDialogProps {
  moduleType: string;
  moduleTitle: string;
  onCreated?: () => void;
}

const NewListingDialog = ({ moduleType, moduleTitle, onCreated }: NewListingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      toast({ title: "Giriş tələb olunur", description: "Yeni təklif əlavə etmək üçün daxil olun" });
      navigate("/auth");
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    if (!title || !location || !price) {
      toast({ title: "Xəta", description: "Başlıq, məkan və qiymət vacibdir", variant: "destructive" });
      return;
    }
    setLoading(true);
    const ownerName =
      user.user_metadata?.company_name ||
      `${user.user_metadata?.first_name ?? ""} ${user.user_metadata?.last_name ?? ""}`.trim() ||
      user.email;

    const { error } = await supabase.from("listings").insert({
      user_id: user.id,
      module_type: moduleType,
      title,
      location,
      price,
      description,
      contact_phone: phone || user.user_metadata?.phone || null,
      details: details ? details.split(",").map((d) => d.trim()).filter(Boolean) : null,
      owner_name: ownerName,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Xəta", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Uğurlu!", description: "Təklifiniz yerləşdirildi" });
    setOpen(false);
    setTitle(""); setLocation(""); setPrice(""); setDescription(""); setDetails(""); setPhone("");
    onCreated?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleClick} className="bg-orange hover:bg-orange/90 text-orange-foreground gap-2">
          <Plus className="h-4 w-4" /> Yeni Təklif
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">{moduleTitle} — Yeni Təklif</DialogTitle>
          <DialogDescription>Təklifinizin detallarını daxil edin. Hamı görə biləcək.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Başlıq *</Label>
            <Input placeholder="Məs: Mercedes Actros 1851" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Məkan *</Label>
              <Input placeholder="Bakı, Azərbaycan" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Qiymət *</Label>
              <Input placeholder="150 AZN/gün" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Təfərrüatlar (vergüllə ayırın)</Label>
            <Input placeholder="Euro 6, GPS, 460 HP" value={details} onChange={(e) => setDetails(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Əlaqə telefonu</Label>
            <Input placeholder="+994 XX XXX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Təsvir</Label>
            <Textarea placeholder="Əlavə məlumat..." rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Ləğv et</Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-orange hover:bg-orange/90 text-orange-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Yerləşdir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewListingDialog;
