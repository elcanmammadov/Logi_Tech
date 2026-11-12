import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Ölkə" },
  { value: 10000, suffix: "+", label: "Aktiv istifadəçi" },
  { value: 25000, suffix: "+", label: "Uğurlu icarə" },
  { value: 99.9, suffix: "%", label: "Platforma işləkliyi" },
];

const format = (n: number, decimal: boolean) =>
  decimal ? n.toFixed(1) : Math.floor(n).toLocaleString("az-AZ").replace(/,/g, " ");

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const decimal = value % 1 !== 0;
  const [display, setDisplay] = useState(format(0, decimal));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1600, 1);
          setDisplay(format((1 - Math.pow(1 - p, 3)) * value, decimal));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, decimal]);

  return (
    <div ref={ref} className="font-display text-4xl font-bold tracking-tight text-white tabular-nums md:text-5xl">
      {display}
      <span className="text-orange">{suffix}</span>
    </div>
  );
};

const StatsSection = () => (
  <section className="bg-navy py-20">
    <div className="container">
      <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-white/10">
        {stats.map((s) => (
          <div key={s.label} className="text-center md:px-6">
            <AnimatedCounter value={s.value} suffix={s.suffix} />
            <div className="mt-2 text-sm text-white/60">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
