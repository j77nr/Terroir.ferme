import { useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sun, Sprout, Droplets, Activity } from "lucide-react";

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.6, bounce: 0 });
  const display = useTransform(spring, v => v.toFixed(decimals) + suffix);
  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

const stats = [
  { icon: Sun, label: "Heures de plein air aujourd'hui", value: 8, suffix: "h", note: "Bovins · Prairies Nord", color: "bg-accent/15 text-accent" },
  { icon: Sprout, label: "Alimentation locale & sans OGM", value: 100, suffix: "%", note: "Tracée parcelle par parcelle", color: "bg-success/15 text-success" },
  { icon: Droplets, label: "pH des bassins (truites)", value: 7.2, decimals: 1, note: "Eau de source · Excellente", color: "bg-foreground/10 text-foreground" },
  { icon: Activity, label: "Température bassins", value: 18, suffix: "°C", note: "Optimal pour salmonidés", color: "bg-warning/20 text-warning-foreground" },
];

export function QualityDashboard() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(i);
  }, []);
  return (
    <section id="qualite" className="py-28 px-6 lg:px-10 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-accent">02 — Indicateurs en direct</span>
            <h2 className="font-serif text-5xl lg:text-6xl mt-3 max-w-2xl leading-[1.05]">
              La ferme, branchée sur le réel.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm opacity-70" suppressHydrationWarning>
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            Mis à jour à {now ? now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "--:--"}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-background/10 p-7 bg-background/[0.03] hover:bg-background/[0.06] transition-colors"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon size={18} />
              </div>
              <div className="font-serif text-5xl mt-6 tracking-tight">
                <Counter to={s.value} suffix={s.suffix ?? ""} decimals={s.decimals ?? 0} />
              </div>
              <div className="text-sm opacity-80 mt-3">{s.label}</div>
              <div className="text-xs opacity-50 mt-1">{s.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
