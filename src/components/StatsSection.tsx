import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Ölkə" },
  { value: 10000, suffix: "+", label: "Aktiv İstifadəçi" },
  { value: 25000, suffix: "+", label: "Uğurlu İcarə" },
  { value: 99.9, suffix: "%", label: "Uptime" },
];

const AnimatedCounter = ({ value, suffix, isDecimal }: { value: number; suffix: string; isDecimal?: boolean }) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      if (isDecimal) {
        setDisplay(current.toFixed(1));
      } else {
        setDisplay(Math.floor(current).toLocaleString());
      }
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [inView, value, isDecimal]);

  return (
    <div ref={ref} className="font-display text-3xl md:text-4xl font-bold text-orange mb-1">
      {display}{suffix}
    </div>
  );
};

const StatsSection = () => (
  <section className="py-16 bg-navy relative overflow-hidden">
    {/* Animated bg line */}
    <motion.div
      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent"
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="text-center"
          >
            <AnimatedCounter value={s.value} suffix={s.suffix} isDecimal={s.value % 1 !== 0} />
            <div className="text-sm text-navy-foreground/70">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
