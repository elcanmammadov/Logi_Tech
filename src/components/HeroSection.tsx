import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  Ship,
  Plane,
  Warehouse,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Globe2,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const tabs = [
  { icon: Truck, label: "TIR" },
  { icon: Ship, label: "Gəmi" },
  { icon: Plane, label: "Təyyarə" },
  { icon: Warehouse, label: "Anbar" },
];

const sampleResults = [
  { route: "Bakı → İstanbul", meta: "Tentli · 20 t · 3 gün", price: "2 400 ₼", rating: "4.9" },
  { route: "Bakı → Tbilisi", meta: "Refrijerator · 18 t · 1 gün", price: "950 ₼", rating: "4.8" },
  { route: "Sumqayıt → Aktau", meta: "Konteyner · 22 t · 2 gün", price: "1 750 ₼", rating: "4.7" },
];

const trust = [
  { icon: ShieldCheck, text: "Yoxlanılmış şirkətlər" },
  { icon: Headphones, text: "24/7 dəstək" },
  { icon: Globe2, text: "50+ ölkə" },
];

const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-white to-muted/60 pt-16">
    {/* Subtle dot grid */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      style={{
        backgroundImage: "radial-gradient(hsl(var(--border)) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />

    <div className="container relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      {/* Copy */}
      <motion.div initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          custom={0}
          className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          Azərbaycanın logistika resurs platforması
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.5rem]"
        >
          Logistika resurslarını{" "}
          <span className="text-primary">bir platformada</span> icarəyə verin və götürün
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          TIR, gəmi və təyyarə yük yerləri, anbar sahələri və peşəkar işçi qüvvəsi —
          etibarlı tərəfdaşlarla birbaşa əlaqə, şəffaf qiymətlər.
        </motion.p>

        <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-3">
          <Link to="/auth">
            <Button size="lg" className="group h-12 gap-2 bg-orange px-6 text-orange-foreground hover:bg-orange/90">
              Pulsuz başla
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <a href="#modules">
            <Button size="lg" variant="outline" className="h-12 bg-white px-6 text-navy">
              Modullara bax
            </Button>
          </a>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          custom={4}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
        >
          {trust.map((t) => (
            <li key={t.text} className="flex items-center gap-2">
              <t.icon className="h-4 w-4 text-primary" />
              {t.text}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Product preview */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-orange/10 blur-2xl" />
        <div className="overflow-hidden rounded-2xl border bg-white shadow-[0_20px_60px_-20px_hsl(var(--navy)/0.25)]">
          {/* window bar */}
          <div className="flex items-center gap-1.5 border-b bg-muted/40 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>

          <div className="p-5">
            <div className="mb-4 flex gap-1 rounded-lg bg-muted p-1">
              {tabs.map((t, i) => (
                <div
                  key={t.label}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium ${
                    i === 0 ? "bg-white text-navy shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t.label}</span>
                </div>
              ))}
            </div>

            <div className="mb-5 grid grid-cols-[1fr_1fr_auto] gap-2">
              {["Bakı", "İstanbul"].map((city, i) => (
                <div key={city} className="flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm">
                  <MapPin className={`h-4 w-4 ${i === 0 ? "text-primary" : "text-orange"}`} />
                  <span className="truncate text-navy">{city}</span>
                </div>
              ))}
              <div className="flex items-center justify-center rounded-lg bg-navy px-3 text-white">
                <Search className="h-4 w-4" />
              </div>
            </div>

            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Uyğun təkliflər
            </p>
            <div className="divide-y rounded-lg border">
              {sampleResults.map((r) => (
                <div key={r.route} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Truck className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-navy">{r.route}</p>
                      <p className="truncate text-xs text-muted-foreground">{r.meta}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-navy">{r.price}</p>
                    <p className="flex items-center justify-end gap-0.5 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-orange text-orange" /> {r.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute -right-4 -top-6 hidden items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-lg sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green/10 text-green">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">Sifariş təsdiqləndi</p>
            <p className="text-xs text-muted-foreground">Bakı → İstanbul · TIR</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
