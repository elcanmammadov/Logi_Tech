import { motion } from "framer-motion";
import { UserPlus, Search, Handshake } from "lucide-react";
import { SectionHeading } from "@/components/ModulesSection";

const steps = [
  {
    icon: UserPlus,
    title: "Qeydiyyatdan keçin",
    desc: "Şirkət və ya fərdi hesab yaradın. Profiliniz yoxlanıldıqdan sonra təsdiq nişanı alırsınız.",
  },
  {
    icon: Search,
    title: "Elan yerləşdirin və ya axtarın",
    desc: "Boş resurslarınızı paylaşın və ya marşrut, tarix və tutuma görə uyğun təklifi tapın.",
  },
  {
    icon: Handshake,
    title: "Razılaşın və işə başlayın",
    desc: "Tərəfdaşla birbaşa əlaqə saxlayın, şərtləri razılaşdırın və sifarişi izləyin.",
  },
];

const HowItWorksSection = () => (
  <section id="how" className="scroll-mt-16 bg-muted/40 py-24">
    <div className="container">
      <SectionHeading
        eyebrow="Necə işləyir"
        title="Üç addımda başlayın"
        description="Qeydiyyatdan ilk sifarişə qədər bir neçə dəqiqə."
      />

      <ol className="relative grid gap-8 md:grid-cols-3">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />
        {steps.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.45 }}
            className="relative"
          >
            <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-full border bg-white text-primary shadow-sm">
              <s.icon className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                {i + 1}
              </span>
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold text-navy">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorksSection;
