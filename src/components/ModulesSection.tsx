import { motion } from "framer-motion";
import { Truck, Ship, Plane, Warehouse, Users, ParkingCircle, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    icon: Truck,
    title: "TIR İcarəsi",
    description: "TIR-larınızı icarəyə verin və ya lazım olan TIR-ı tapın. GPS izləmə və sürücü təyinatı.",
    color: "bg-primary",
    hoverColor: "group-hover:shadow-primary/20",
    count: "524 aktiv elan",
    path: "/modules/trucks",
  },
  {
    icon: Ship,
    title: "Gəmi Yeri İcarəsi",
    description: "Gəmilərdəki boş yerləri icarəyə verin. Konteyner və yük daşıma xidmətləri.",
    color: "bg-navy",
    hoverColor: "group-hover:shadow-navy/20",
    count: "189 aktiv elan",
    path: "/modules/ships",
  },
  {
    icon: Plane,
    title: "Təyyarə Yeri İcarəsi",
    description: "Təyyarələrdə yük yerini icarəyə götürün. Hava yolu kargo xidmətləri.",
    color: "bg-orange",
    hoverColor: "group-hover:shadow-orange/20",
    count: "97 aktiv elan",
    path: "/modules/aircraft",
  },
  {
    icon: Warehouse,
    title: "Anbar İcarəsi",
    description: "Dünya üzrə anbar sahələrini icarəyə götürün və ya öz anbarınızı paylaşın.",
    color: "bg-green",
    hoverColor: "group-hover:shadow-green/20",
    count: "312 aktiv elan",
    path: "/modules/warehouses",
  },
  {
    icon: Users,
    title: "İşçi Qüvvəsi",
    description: "Logistika sahəsində peşəkar işçi qüvvəsi — sürücülər, anbardarlar, dispetçerlər.",
    color: "bg-secondary",
    hoverColor: "group-hover:shadow-secondary/20",
    count: "1,247 mütəxəssis",
    path: "/modules/workforce",
  },
  {
    icon: ParkingCircle,
    title: "Parking Tapıcı",
    description: "Dünya xəritəsində TIR parking yerlərini tapın. Real vaxt məlumatları.",
    color: "bg-accent",
    hoverColor: "group-hover:shadow-accent/20",
    count: "2,500+ parking",
    path: "/parking",
  },
];

const ModulesSection = () => {
  return (
    <section id="modules" className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-4"
          >
            Modullar
          </motion.span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Bütün Logistika Modulları
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Bir platformada bütün logistika ehtiyaclarınızı həll edin — daşınma, saxlama, işçi
            qüvvəsi və daha çox.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <Link
                to={mod.path}
                className={`group block bg-card rounded-xl p-6 border shadow-[var(--shadow-card)] hover:shadow-xl ${mod.hoverColor} transition-all duration-500 hover:-translate-y-2`}
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className={`inline-flex p-3 rounded-lg ${mod.color} text-card`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <mod.icon className="h-6 w-6" />
                  </motion.div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {mod.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {mod.description}
                </p>
                <span className="text-xs font-medium text-primary/70">{mod.count}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
