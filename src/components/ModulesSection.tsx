import { motion } from "framer-motion";
import { Truck, Ship, Plane, Warehouse, Users, ParkingCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    icon: Truck,
    title: "TIR icarəsi",
    description: "TIR-larınızı icarəyə verin və ya lazım olanı tapın. GPS izləmə və sürücü təyinatı.",
    count: "524 aktiv elan",
    path: "/modules/trucks",
  },
  {
    icon: Ship,
    title: "Gəmi yeri icarəsi",
    description: "Gəmilərdəki boş yük yerlərini icarəyə verin. Konteyner və yük daşıma xidmətləri.",
    count: "189 aktiv elan",
    path: "/modules/ships",
  },
  {
    icon: Plane,
    title: "Təyyarə yeri icarəsi",
    description: "Təyyarələrdə yük yerini icarəyə götürün. Sürətli hava yolu kargo xidmətləri.",
    count: "97 aktiv elan",
    path: "/modules/aircraft",
  },
  {
    icon: Warehouse,
    title: "Anbar icarəsi",
    description: "Dünya üzrə anbar sahələrini icarəyə götürün və ya öz anbarınızı paylaşın.",
    count: "312 aktiv elan",
    path: "/modules/warehouses",
  },
  {
    icon: Users,
    title: "İşçi qüvvəsi",
    description: "Sürücülər, anbardarlar və dispetçerlər — logistika üzrə peşəkar mütəxəssislər.",
    count: "1 247 mütəxəssis",
    path: "/modules/workforce",
  },
  {
    icon: ParkingCircle,
    title: "Parking tapıcı",
    description: "Xəritə üzərində TIR parkinq yerlərini tapın və marşrutunuzu planlaşdırın.",
    count: "2 500+ parkinq",
    path: "/parking",
  },
];

export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5 }}
    className="mx-auto mb-14 max-w-2xl text-center"
  >
    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
    <h2 className="font-display text-3xl font-bold tracking-tight text-navy md:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>}
  </motion.div>
);

const ModulesSection = () => (
  <section id="modules" className="scroll-mt-16 bg-white py-24">
    <div className="container">
      <SectionHeading
        eyebrow="Modullar"
        title="Bütün logistika ehtiyaclarınız bir yerdə"
        description="Daşınma, saxlama və işçi qüvvəsi — ayrı-ayrı platformalar axtarmağa ehtiyac yoxdur."
      />

      <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod, i) => (
          <motion.div
            key={mod.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="bg-white"
          >
            <Link
              to={mod.path}
              className="group flex h-full flex-col p-8 transition-colors hover:bg-muted/40"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <mod.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-navy">{mod.title}</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">{mod.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{mod.count}</span>
                <span className="flex items-center gap-1 font-medium text-primary">
                  Bax
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ModulesSection;
