import { Users, AlertTriangle, ShoppingCart, Wheat } from "lucide-react";
import { kpiData } from "@/lib/mockData";

const cards = [
  { label: "Animaux total", value: kpiData.totalLivestock.toLocaleString("fr-FR"), delta: "+12 ce mois", icon: Users, color: "text-primary" },
  { label: "Alertes actives", value: kpiData.activeAlerts, delta: "1 critique", icon: AlertTriangle, color: "text-destructive" },
  { label: "Commandes en attente", value: kpiData.pendingOrders, delta: "à préparer", icon: ShoppingCart, color: "text-warning-foreground" },
  { label: "Stock granulés", value: `${kpiData.feedStockDays}j`, delta: "stock bas", icon: Wheat, color: "text-warning-foreground", warn: true },
];

export function Kpis() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(c => (
        <div key={c.label} className="bg-card border border-border rounded-lg p-5 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</span>
            <c.icon size={16} className={c.color} />
          </div>
          <div className="text-3xl font-semibold mt-3">{c.value}</div>
          <div className="text-xs text-muted-foreground mt-1">{c.delta}</div>
          {c.warn && <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-warning animate-pulse" />}
        </div>
      ))}
    </div>
  );
}
