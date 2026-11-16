import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16 grain">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -right-32 h-[520px] w-[520px] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 -left-32 h-[420px] w-[420px] rounded-full bg-foreground/10 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" /> Saison 2025 · Lot vivant
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif text-5xl sm:text-7xl lg:text-[8rem] leading-[0.95] tracking-tight mt-6 text-balance max-w-5xl"
        >
          L'Élevage de Demain,<br />
          <em className="text-accent not-italic font-medium">la Transparence</em> d'Aujourd'hui.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 max-w-xl text-lg text-muted-foreground"
        >
          Bovins, volailles, porcs, lapins et truites élevés à ciel ouvert, capteurs à l'appui.
          Chaque animal a un nom, chaque parcelle, une histoire mesurée en temps réel.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a href="#ferme" className="rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-foreground/90 transition">
            Visiter la ferme
          </a>
          <a href="#boutique" className="rounded-full border border-foreground/20 px-7 py-3.5 text-sm font-medium hover:bg-foreground/5 transition">
            Réserver ma part
          </a>
        </motion.div>
      </div>
      <motion.a
        href="#ferme"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"
      >
        Défiler
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
