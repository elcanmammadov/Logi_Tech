import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, Headphones, Globe2 } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Sürətli İcarə",
    desc: "Bir neçə kliklə resurslarınızı icarəyə verin və ya götürün.",
  },
  {
    icon: CheckCircle,
    title: "Təsdiqlənmiş Tərəfdaşlar",
    desc: "Bütün şirkətlər yoxlanılıb və etibarlıdır.",
  },
  {
    icon: Headphones,
    title: "24/7 Dəstək",
    desc: "İstənilən vaxt komandamızla əlaqə saxlayın.",
  },
  {
    icon: Globe2,
    title: "Qlobal Şəbəkə",
    desc: "50+ ölkədə aktiv logistika tərəfdaşları.",
  },
];

const FeaturesSection = () => (
  <section className="py-20 bg-muted/30">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="inline-block bg-orange/10 text-orange rounded-full px-4 py-1 text-sm font-medium mb-4">
          Niyə LogiTech?
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          Platformanın Üstünlükləri
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="bg-card rounded-xl p-6 border text-center group hover:shadow-lg transition-all duration-300"
          >
            <motion.div
              className="inline-flex p-3 rounded-full bg-orange/10 text-orange mb-4"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <f.icon className="h-6 w-6" />
            </motion.div>
            <h3 className="font-display font-semibold text-card-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
