import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";

export function CartDrawer() {
  const { items, open, setOpen, setQty, total, count, clear } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  const onCheckout = () => {
    setCheckedOut(true);
    setTimeout(() => { clear(); setCheckedOut(false); setOpen(false); }, 1800);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-card flex flex-col"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <div className="font-serif text-2xl">Votre panier</div>
                <div className="text-xs text-muted-foreground">{count} article{count > 1 ? "s" : ""}</div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-secondary">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {checkedOut ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-16">
                  <div className="mx-auto h-16 w-16 rounded-full bg-success/15 text-success flex items-center justify-center">
                    <Check size={28} />
                  </div>
                  <div className="font-serif text-2xl mt-4">Commande confirmée</div>
                  <p className="text-sm text-muted-foreground mt-2">Vous recevrez un mail dès que le lot est prêt.</p>
                </motion.div>
              ) : items.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <ShoppingBag size={32} className="mx-auto opacity-40" />
                  <p className="mt-4 text-sm">Votre panier est vide.</p>
                </div>
              ) : items.map(it => (
                <div key={it.product.id} className="flex gap-4 p-3 rounded-2xl bg-secondary/50">
                  <div className="h-16 w-16 rounded-xl bg-card flex items-center justify-center text-3xl">
                    {({ beef: "🥩", trout: "🐟", chicken: "🐔", capon: "🦃", rabbit: "🐇", pork: "🐖" } as Record<string, string>)[it.product.image]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium leading-tight truncate">{it.product.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{it.product.unit} · {it.product.price}€</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => setQty(it.product.id, it.quantity - 1)} className="h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary"><Minus size={12} /></button>
                      <span className="text-sm w-5 text-center">{it.quantity}</span>
                      <button onClick={() => setQty(it.product.id, it.quantity + 1)} className="h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary"><Plus size={12} /></button>
                    </div>
                  </div>
                  <div className="font-serif text-lg">{(it.product.price * it.quantity).toFixed(0)}€</div>
                </div>
              ))}
            </div>

            {!checkedOut && items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Sous-total</span><span>{total.toFixed(2)}€</span></div>
                <div className="flex justify-between"><span className="font-serif text-lg">Total</span><span className="font-serif text-2xl">{total.toFixed(2)}€</span></div>
                <button onClick={onCheckout} className="w-full rounded-full bg-foreground text-background py-3.5 text-sm font-medium hover:bg-accent transition">
                  Confirmer la précommande
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
