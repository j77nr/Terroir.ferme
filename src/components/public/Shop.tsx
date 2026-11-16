import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { products, type Product } from "@/lib/mockData";
import { useCart } from "@/lib/cart-store";

const emojiFor: Record<string, string> = {
  beef: "🥩", trout: "🐟", chicken: "🐔", capon: "🦃", rabbit: "🐇", pork: "🐖",
};

export function Shop() {
  const { add } = useCart();
  return (
    <section id="boutique" className="py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-accent">03 — Click & Collect</span>
            <h2 className="font-serif text-5xl lg:text-6xl mt-3 max-w-3xl leading-[1.05]">
              Réservez votre part, partagez l'animal.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Nos colis sont préparés lorsque le lot est complet. C'est ainsi qu'on respecte chaque bête.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => <ProductCard key={p.id} p={p} i={i} onAdd={add} />)}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, i, onAdd }: { p: Product; i: number; onAdd: (p: Product) => void }) {
  const pct = Math.round((p.reserved / p.capacity) * 100);
  const left = p.capacity - p.reserved;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.06 }}
      className="group rounded-3xl border border-border bg-card overflow-hidden hover:shadow-[0_25px_60px_-30px_rgba(20,36,28,0.35)] hover:-translate-y-1 transition-all duration-500"
    >
      <div className="aspect-[5/4] relative bg-gradient-to-br from-secondary to-accent/20 flex items-center justify-center overflow-hidden">
        <motion.div whileHover={{ scale: 1.08, rotate: -3 }} className="text-9xl select-none">
          {emojiFor[p.image] ?? "🌾"}
        </motion.div>
        <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] bg-card/90 backdrop-blur px-3 py-1.5 rounded-full">
          {p.unit}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-2xl leading-tight">{p.name}</h3>
          <div className="font-serif text-2xl text-accent">{p.price}€</div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>

        <div className="mt-5">
          <div className="flex justify-between text-xs mb-2">
            <span className="font-medium">{pct}% réservé</span>
            <span className="text-muted-foreground">
              {left > 0 ? `Plus que ${left} part${left > 1 ? "s" : ""}` : "Complet — prochain lot bientôt"}
            </span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`h-full ${pct >= 90 ? "bg-destructive" : pct >= 60 ? "bg-accent" : "bg-success"}`}
            />
          </div>
        </div>

        <button
          onClick={() => onAdd(p)}
          disabled={left <= 0}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3 text-sm font-medium hover:bg-accent transition disabled:opacity-40 disabled:hover:bg-foreground"
        >
          <Plus size={16} /> Ajouter au panier
        </button>
      </div>
    </motion.article>
  );
}
