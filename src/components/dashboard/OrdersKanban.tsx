import { useState } from "react";
import { motion } from "framer-motion";
import { orders as seedOrders, type Order } from "@/lib/mockData";

const cols: { id: Order["status"]; label: string; color: string }[] = [
  { id: "en_attente", label: "En attente", color: "bg-warning/15 text-warning-foreground" },
  { id: "prepare", label: "Préparées", color: "bg-primary/10 text-primary" },
  { id: "retire", label: "Retirées", color: "bg-secondary text-muted-foreground" },
];

export function OrdersKanban() {
  const [orders, setOrders] = useState(seedOrders);
  const move = (id: string, dir: 1 | -1) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const idx = cols.findIndex(c => c.id === o.status);
      const next = cols[Math.max(0, Math.min(cols.length - 1, idx + dir))];
      return { ...o, status: next.id };
    }));
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {cols.map(c => {
        const list = orders.filter(o => o.status === c.id);
        return (
          <div key={c.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${c.color}`}>{c.label}</span>
                <span className="text-xs text-muted-foreground">{list.length}</span>
              </div>
            </div>
            <div className="space-y-2">
              {list.map(o => (
                <motion.div key={o.id} layout className="p-3 rounded-md border border-border bg-background hover:border-primary/40 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-mono text-muted-foreground">{o.id}</div>
                      <div className="font-medium text-sm mt-0.5">{o.client}</div>
                    </div>
                    <div className="text-sm font-semibold">{o.total}€</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{o.quantity}× {o.product}</div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[10px] text-muted-foreground">{new Date(o.date).toLocaleDateString("fr-FR")}</span>
                    <div className="flex gap-1">
                      <button onClick={() => move(o.id, -1)} disabled={c.id === "en_attente"} className="text-[11px] px-2 py-0.5 rounded border border-border hover:bg-secondary disabled:opacity-30">←</button>
                      <button onClick={() => move(o.id, 1)} disabled={c.id === "retire"} className="text-[11px] px-2 py-0.5 rounded border border-border hover:bg-secondary disabled:opacity-30">→</button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {list.length === 0 && <div className="text-xs text-muted-foreground text-center py-6">Vide</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
