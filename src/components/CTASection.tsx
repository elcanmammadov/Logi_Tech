import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="py-20 bg-gradient-to-br from-navy via-navy to-primary/80 relative overflow-hidden">
    <motion.div
      className="absolute inset-0 opacity-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.1 }}
      viewport={{ once: true }}
    >
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-orange rounded-full blur-[200px]"
      />
    </motion.div>

    <div className="container relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-navy-foreground mb-4">
          Logistika resurslarınızı paylaşmağa hazırsınız?
        </h2>
        <p className="text-navy-foreground/60 max-w-xl mx-auto mb-8 text-sm sm:text-base">
          İndi qeydiyyatdan keçin və minlərlə logistika şirkəti ilə əməkdaşlığa başlayın.
        </p>
        <Link to="/auth">
          <Button size="lg" className="bg-orange hover:bg-orange/90 text-orange-foreground gap-2 group">
            Pulsuz Qeydiyyat <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
