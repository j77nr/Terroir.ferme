import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sun, Wheat, Heart } from "lucide-react";
import { farmZones, livestock, type FarmZone } from "@/lib/mockData";

const categoryLabel: Record<string, string> = {
  bovins: "Bovins", volailles: "Volailles", porcins: "Porcins",
  alevins: "Pisciculture", lapins: "Lapins",
};

export function FarmMap() {
  const [active, setActive] = useState<FarmZone | null>(null);
  const batches = active ? livestock.filter(l => l.zoneId === active.id) : [];
  const totalAnimals = batches.reduce((s, b) => s + b.count, 0);
  const avgOutdoor = batches.length ? batches.reduce((s, b) => s + b.outdoorHours, 0) / batches.length : 0;

  return (
    <section id="ferme" className="py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-accent">01 — Cartographie vivante</span>
            <h2 className="font-serif text-5xl lg:text-6xl mt-3 max-w-2xl leading-[1.05]">
              Explorez chaque parcelle, en direct.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Touchez une zone pour voir l'alimentation, les heures de plein air et l'état sanitaire du lot.
          </p>
        </div>

        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-secondary via-cream to-secondary shadow-[0_30px_80px_-40px_rgba(20,36,28,0.35)]">
          <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.1" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" className="text-foreground" />
            <path d="M0,60 Q30,40 60,55 T100,50" stroke="currentColor" strokeWidth="0.4" fill="none" className="text-accent opacity-60" />
            <path d="M0,75 Q40,65 70,72 T100,70" stroke="currentColor" strokeWidth="0.3" fill="none" className="text-foreground opacity-40" />
          </svg>

          {farmZones.map((z, i) => (
            <motion.button
              key={z.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActive(z)}
              className="absolute group rounded-2xl border border-foreground/15 bg-card/70 backdrop-blur-sm hover:border-accent hover:bg-card transition-all text-left p-3 lg:p-4 shadow-sm hover:shadow-lg"
              style={{ left: `${z.x}%`, top: `${z.y}%`, width: `${z.w}%`, height: `${z.h}%` }}
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-accent">{categoryLabel[z.category]}</div>
              <div className="font-serif text-base lg:text-xl mt-1 leading-tight">{z.name}</div>
              <div className="text-[11px] text-muted-foreground mt-1 hidden lg:block">{z.summary}</div>
              <div className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-success animate-pulse" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: "spring", damping: 24 }}
              onClick={e => e.stopPropagation()}
              className="bg-card rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-border"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-accent">{categoryLabel[active.category]}</div>
                  <h3 className="font-serif text-4xl mt-1">{active.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{active.summary}</p>
                </div>
                <button onClick={() => setActive(null)} className="rounded-full p-2 hover:bg-secondary transition">
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <Stat icon={<Heart size={14} />} label="Animaux" value={totalAnimals.toString()} />
                <Stat icon={<Sun size={14} />} label="Plein air / jour" value={`${avgOutdoor.toFixed(1)} h`} />
                <Stat icon={<Wheat size={14} />} label="Alimentation" value="100% locale" />
              </div>

              <div className="space-y-3">
                {batches.map(b => (
                  <div key={b.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/60">
                    <div>
                      <div className="font-medium">{b.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{b.count} animaux · {b.diet}</div>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      b.status === "good" ? "bg-success/15 text-success" :
                      b.status === "warning" ? "bg-warning/20 text-warning-foreground" :
                      "bg-destructive/15 text-destructive"
                    }`}>
                      {b.status === "good" ? "Sain" : b.status === "warning" ? "Surveillance" : "Alerte"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl bg-secondary/60">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{icon}{label}</div>
      <div className="font-serif text-2xl mt-1">{value}</div>
    </div>
  );
}
