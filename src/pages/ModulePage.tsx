import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Ship, Plane, Warehouse, Users, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewListingDialog from "@/components/listings/NewListingDialog";
import ListingDetailsDialog, { type ListingItem } from "@/components/listings/ListingDetailsDialog";
import InquiryDialog from "@/components/listings/InquiryDialog";
import { supabase } from "@/integrations/supabase/client";

const moduleData: Record<string, { icon: any; title: string; description: string; color: string; mock: ListingItem[] }> = {
  trucks: {
    icon: Truck, title: "TIR İcarəsi",
    description: "Logistika şirkətləri üçün TIR-ların icarəyə verilməsi və götürülməsi platforması.",
    color: "bg-primary",
    mock: [
      { id: "m1", title: "Mercedes Actros 1851 LS", location: "Bakı, Azərbaycan", price: "150 AZN/gün", status: "Mövcud", rating: 4.8, owner: "Trans-Caspian LLC", details: ["Euro 6", "Refrigerator", "GPS", "460 HP"] },
      { id: "m2", title: "Volvo FH16 750", location: "İstanbul, Türkiyə", price: "200 USD/gün", status: "Mövcud", rating: 4.9, owner: "Anadolu Logistics", details: ["Euro 6", "750 HP", "I-Shift"] },
      { id: "m3", title: "MAN TGX 18.510 4x2", location: "Moskva, Rusiya", price: "180 USD/gün", status: "Bron edilib", rating: 4.6, owner: "RusTrans Group", details: ["Euro 6", "510 HP", "Soyuducu"] },
      { id: "m4", title: "Scania R500 Highline", location: "Hamburg, Almaniya", price: "220 EUR/gün", status: "Mövcud", rating: 4.7, owner: "EuroFreight GmbH", details: ["Euro 6d", "500 HP", "LED"] },
      { id: "m5", title: "DAF XF 480 FT", location: "Rotterdam, Hollandiya", price: "190 EUR/gün", status: "Mövcud", rating: 4.5, owner: "Holland Transport BV", details: ["Euro 6", "480 HP"] },
    ],
  },
  ships: {
    icon: Ship, title: "Gəmi Yeri İcarəsi",
    description: "Gəmilərdə konteyner və yük yerlərinin icarəsi.",
    color: "bg-navy",
    mock: [
      { id: "m1", title: "20ft Standard Konteyner", location: "Bakı — Aktau marşrutu", price: "500 USD", status: "Mövcud", rating: 4.7, owner: "Caspian Shipping Co.", details: ["33 m³", "28 ton", "Sığortalı"] },
      { id: "m2", title: "40ft High Cube Konteyner", location: "İstanbul — Odessa", price: "900 USD", status: "Mövcud", rating: 4.8, owner: "TurkDeniz AS", details: ["76 m³", "30 ton", "GPS"] },
      { id: "m3", title: "40ft Reefer Konteyner", location: "Rotterdam — New York", price: "2,800 EUR", status: "Mövcud", rating: 4.9, owner: "Atlantic Lines BV", details: ["-25°C to +25°C", "Pharma"] },
      { id: "m4", title: "Bulk Cargo — 500 ton", location: "Dubay — Mumbai", price: "12,000 USD", status: "Bron edilib", rating: 4.5, owner: "Arabian Seas Ltd", details: ["500 ton", "21 gün"] },
    ],
  },
  aircraft: {
    icon: Plane, title: "Təyyarə Yeri İcarəsi",
    description: "Hava yolu kargo yerlərinin icarəsi.",
    color: "bg-orange",
    mock: [
      { id: "m1", title: "Boeing 747-400F — 5 ton", location: "Bakı (GYD) → Frankfurt (FRA)", price: "3,200 USD", status: "Mövcud", rating: 4.8, owner: "Silk Way Airlines", details: ["5 ton", "12 saat", "Hazmat OK"] },
      { id: "m2", title: "Airbus A330-200F — 10 ton", location: "İstanbul → London", price: "7,500 USD", status: "Mövcud", rating: 4.9, owner: "Turkish Cargo", details: ["10 ton", "ULD", "Live animals"] },
      { id: "m3", title: "Boeing 777F — 3 ton Express", location: "Dubay → New York", price: "5,000 USD", status: "Bron edilib", rating: 4.7, owner: "Emirates SkyCargo", details: ["3 ton", "Express", "Pharma"] },
      { id: "m4", title: "An-124 Ruslan — Oversized", location: "Moskva → anywhere", price: "45,000 USD", status: "Mövcud", rating: 4.6, owner: "Volga-Dnepr", details: ["120 ton", "Oversized", "Charter"] },
    ],
  },
  warehouses: {
    icon: Warehouse, title: "Anbar İcarəsi",
    description: "Dünya üzrə anbar sahələrinin icarəsi.",
    color: "bg-green",
    mock: [
      { id: "m1", title: "500m² Soyuq Anbar (-18°C)", location: "Bakı — Pirallahı", price: "2,000 AZN/ay", status: "Mövcud", rating: 4.7, owner: "AzCold Storage", details: ["-18°C", "500 m²", "HACCP"] },
      { id: "m2", title: "2,000m² Logistika Mərkəzi", location: "İstanbul — Hadımköy", price: "8,500 USD/ay", status: "Mövcud", rating: 4.9, owner: "Anadolu Depo", details: ["Cross-dock", "WMS", "50 dok"] },
      { id: "m3", title: "750m² ADR Təhlükəsiz Anbar", location: "Hamburg, Almaniya", price: "6,500 EUR/ay", status: "Mövcud", rating: 4.6, owner: "HanseLager GmbH", details: ["ADR", "Sprinkler", "ISO 14001"] },
      { id: "m4", title: "1,200m² Gömrük Anbarı", location: "Dubay — Jebel Ali", price: "5,000 USD/ay", status: "Mövcud", rating: 4.8, owner: "FreeZone Logistics", details: ["Bonded", "Customs", "Free Zone"] },
    ],
  },
  workforce: {
    icon: Users, title: "İşçi Qüvvəsi İcarəsi",
    description: "Logistika sahəsində peşəkar işçi qüvvəsi.",
    color: "bg-secondary text-secondary-foreground",
    mock: [
      { id: "m1", title: "Beynəlxalq TIR Sürücüsü (CE)", location: "Bakı — Avropa", price: "100 AZN/gün", status: "Mövcud", rating: 4.9, owner: "Özü", details: ["15 il", "ADR", "5 dil"] },
      { id: "m2", title: "Baş Anbardar / WMS Operator", location: "İstanbul, Türkiyə", price: "75 USD/gün", status: "Mövcud", rating: 4.7, owner: "Özü", details: ["SAP WM", "10 il", "RF Scanner"] },
      { id: "m3", title: "Logistika Dispetçeri", location: "Moskva, Rusiya", price: "90 USD/gün", status: "Bron edilib", rating: 4.8, owner: "Özü", details: ["TMS", "Route", "FTL/LTL"] },
      { id: "m4", title: "Gömrük Brokeri", location: "Hamburg, Almaniya", price: "120 EUR/gün", status: "Mövcud", rating: 4.9, owner: "Customs Expert AG", details: ["EU", "AEO", "15 il"] },
    ],
  },
};

const ModulePage = () => {
  const { type } = useParams<{ type: string }>();
  const data = moduleData[type || ""];
  const [realListings, setRealListings] = useState<ListingItem[]>([]);
  const [selected, setSelected] = useState<ListingItem | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const fetchListings = async () => {
    if (!type) return;
    const { data: rows } = await supabase
      .from("listings")
      .select("*")
      .eq("module_type", type)
      .order("created_at", { ascending: false });
    if (rows) {
      setRealListings(rows.map((r) => ({
        id: r.id,
        title: r.title,
        location: r.location,
        price: r.price,
        status: r.status,
        rating: r.rating ? Number(r.rating) : undefined,
        owner: r.owner_name || undefined,
        user_id: r.user_id,
        details: r.details || undefined,
        description: r.description || undefined,
        contact_phone: r.contact_phone || undefined,
        created_at: r.created_at,
      })));
    }
  };

  useEffect(() => { fetchListings(); }, [type]);

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Modul tapılmadı</p></div>;
  }

  const Icon = data.icon;
  const allListings: ListingItem[] = [...realListings, ...data.mock];

  const openDetails = (item: ListingItem) => { setSelected(item); setDetailsOpen(true); };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        <div className="bg-navy py-16 relative overflow-hidden">
          <motion.div className="absolute inset-0 opacity-10" initial={{ opacity: 0 }} animate={{ opacity: 0.1 }}>
            <motion.div animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-0 right-0 w-96 h-96 bg-orange rounded-full blur-[150px]" />
          </motion.div>
          <div className="container relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-5">
              <motion.div className={`p-4 rounded-2xl ${data.color} text-card`} whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                <Icon className="h-10 w-10" />
              </motion.div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-navy-foreground">{data.title}</h1>
                <p className="text-navy-foreground/60 mt-1 text-lg">{data.description}</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
            <h2 className="font-display text-xl font-semibold">Mövcud Təkliflər ({allListings.length})</h2>
            <NewListingDialog moduleType={type!} moduleTitle={data.title} onCreated={fetchListings} />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {allListings.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-500 border-transparent hover:border-primary/20 overflow-hidden group">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base leading-tight">{item.title}</CardTitle>
                        <Badge className={item.status === "Mövcud" ? "bg-green text-green-foreground shrink-0" : "shrink-0"}>
                          {item.status}
                        </Badge>
                      </div>
                      {item.owner && <p className="text-xs text-muted-foreground mt-1">{item.owner}</p>}
                    </CardHeader>
                    <CardContent className="pb-2 space-y-3">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      {item.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-orange text-orange" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                      )}
                      {item.details && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.details.slice(0, 4).map((d) => (
                            <span key={d} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{d}</span>
                          ))}
                        </div>
                      )}
                      <p className="text-xl font-display font-bold text-primary">{item.price}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => openDetails(item)}>
                        Ətraflı Bax
                      </Button>
                      <InquiryDialog
                        listingId={String(item.id)}
                        listingTitle={item.title}
                        ownerUserId={item.user_id}
                        trigger={
                          <Button size="sm" className="w-full bg-orange hover:bg-orange/90 text-orange-foreground">
                            Sifariş et
                          </Button>
                        }
                      />
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <ListingDetailsDialog listing={selected} open={detailsOpen} onOpenChange={setDetailsOpen} />
      <Footer />
    </div>
  );
};

export default ModulePage;
