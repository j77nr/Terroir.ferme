import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { livestock, type LivestockBatch, type LivestockCategory, type HealthStatus } from "@/lib/mockData";
import { LivestockPanel } from "./LivestockPanel";

const tabs: { id: LivestockCategory | "all"; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "bovins", label: "Bovins" },
  { id: "volailles", label: "Volailles" },
  { id: "porcins", label: "Porcins" },
  { id: "alevins", label: "Pisciculture" },
  { id: "lapins", label: "Lapins" },
];

const statusBadge = (s: HealthStatus) => {
  const m = {
    good: "bg-primary/10 text-primary",
    warning: "bg-warning/20 text-warning-foreground",
    alert: "bg-destructive/10 text-destructive",
  } as const;
  const l = { good: "Bon état", warning: "Surveillance", alert: "Alerte" };
  return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${m[s]}`}>{l[s]}</span>;
};

export function LivestockTable() {
  const [tab, setTab] = useState<LivestockCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<HealthStatus | "all">("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<LivestockBatch | null>(null);

  const filtered = useMemo(() => livestock.filter(l =>
    (tab === "all" || l.category === tab) &&
    (statusFilter === "all" || l.status === statusFilter) &&
    (q === "" || l.name.toLowerCase().includes(q.toLowerCase()) || l.id.toLowerCase().includes(q.toLowerCase()))
  ), [tab, statusFilter, q]);

  return (
    <section className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-5 pt-5 pb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Cheptel</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} lots — données mises à jour en direct</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher…" className="pl-8 pr-3 py-1.5 text-sm border border-border rounded-md bg-background w-44 focus:outline-none focus:ring-2 focus:ring-ring/30" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as HealthStatus | "all")} className="text-sm border border-border rounded-md px-2 py-1.5 bg-background">
            <option value="all">Tous statuts</option>
            <option value="good">Bon état</option>
            <option value="warning">Surveillance</option>
            <option value="alert">Alerte</option>
          </select>
        </div>
      </div>

      <div className="px-5 flex gap-1 border-b border-border overflow-x-auto scrollbar-hide">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-2 text-sm border-b-2 transition whitespace-nowrap ${
              tab === t.id ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>{t.label}</button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase tracking-wider bg-secondary/50">
            <tr>
              <th className="text-left font-medium px-5 py-3">ID</th>
              <th className="text-left font-medium px-5 py-3">Lot</th>
              <th className="text-left font-medium px-5 py-3">Animaux</th>
              <th className="text-left font-medium px-5 py-3">Âge</th>
              <th className="text-left font-medium px-5 py-3">Statut</th>
              <th className="text-left font-medium px-5 py-3">Dernière visite véto</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} onClick={() => setSelected(l)} className="border-t border-border hover:bg-secondary/50 cursor-pointer transition">
                <td className="px-5 py-3 font-mono text-xs">{l.id}</td>
                <td className="px-5 py-3 font-medium">{l.name}</td>
                <td className="px-5 py-3">{l.count}</td>
                <td className="px-5 py-3">{l.ageMonths} mois</td>
                <td className="px-5 py-3">{statusBadge(l.status)}</td>
                <td className="px-5 py-3 text-muted-foreground">{new Date(l.lastVetVisit).toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">Aucun résultat.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)} className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm" />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-card border-l border-border overflow-y-auto"
            >
              <div className="sticky top-0 bg-card border-b border-border flex items-center justify-between p-5">
                <div>
                  <div className="text-xs font-mono text-muted-foreground">{selected.id}</div>
                  <h3 className="text-lg font-semibold">{selected.name}</h3>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 hover:bg-secondary rounded-md"><X size={16} /></button>
              </div>
              <LivestockPanel batch={selected} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
