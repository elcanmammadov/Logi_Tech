import { motion } from "framer-motion";
import { Zap, BadgeCheck, Headphones, Globe2, Lock, LineChart } from "lucide-react";
import { SectionHeading } from "@/components/ModulesSection";

const features = [
  { icon: Zap, title: "Sürətli icarə", desc: "Bir neçə kliklə resurslarınızı icarəyə verin və ya götürün." },
  { icon: BadgeCheck, title: "Təsdiqlənmiş tərəfdaşlar", desc: "Platformadakı şirkətlər sənədlərə əsasən yoxlanılır." },
  { icon: Lock, title: "Təhlükəsiz əməliyyatlar", desc: "Məlumatlarınız qorunur, əlaqələr platforma daxilində aparılır." },
  { icon: LineChart, title: "Şəffaf qiymətlər", desc: "Təklifləri müqayisə edin, gizli ödənişlər olmadan seçin." },
  { icon: Headphones, title: "24/7 dəstək", desc: "Komandamız istənilən vaxt suallarınızı cavablandırır." },
  { icon: Globe2, title: "Qlobal şəbəkə", desc: "50+ ölkədə aktiv logistika tərəfdaşları." },
];

const FeaturesSection = () => (
  <section id="about" className="scroll-mt-16 bg-white py-24">
    <div className="container">
      <SectionHeading
        eyebrow="Üstünlüklər"
        title="Logistika şirkətləri üçün qurulub"
        description="Daşıyıcılar, ekspeditorlar və anbar sahibləri üçün etibarlı, sadə və şəffaf platforma."
      />

      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="flex gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange/10 text-orange">
              <f.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="mb-1.5 font-display font-semibold text-navy">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
