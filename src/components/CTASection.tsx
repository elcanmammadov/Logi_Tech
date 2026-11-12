import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="bg-white py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12 md:py-20"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(hsl(0 0% 100% / .25) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / .25) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
          }}
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Resurslarınızı işlətməyə bu gün başlayın
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
            Pulsuz qeydiyyatdan keçin və minlərlə logistika şirkəti ilə əməkdaşlıq edin.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/auth">
              <Button size="lg" className="group h-12 gap-2 bg-white px-6 text-navy hover:bg-white/90">
                Pulsuz qeydiyyat
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <a href="mailto:info@logitech.az">
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/40 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              >
                Bizimlə əlaqə
              </Button>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
