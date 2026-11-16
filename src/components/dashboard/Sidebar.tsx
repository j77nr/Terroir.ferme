import { Leaf, LayoutDashboard, ListTree, Droplets, Package, LogOut } from "lucide-react";
import { Link } from "@tanstack/react-router";

export type DashSection = "overview" | "livestock" | "water" | "orders";

interface Props { section: DashSection; onChange: (s: DashSection) => void; }
const items: { id: DashSection; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Vue globale", icon: LayoutDashboard },
  { id: "livestock", label: "Cheptel", icon: ListTree },
  { id: "water", label: "IoT Bassins", icon: Droplets },
  { id: "orders", label: "Commandes", icon: Package },
];

export function DashSidebar({ section, onChange }: Props) {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="h-16 flex items-center gap-2 px-6 border-b border-border">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground"><Leaf size={14} /></div>
        <div>
          <div className="text-sm font-semibold tracking-tight">Terroir & Tech</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">ERP Éleveur</div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map(it => {
          const active = section === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onChange(it.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${
                active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <it.icon size={16} /> {it.label}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-border">
        <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition">
          <LogOut size={16} /> Quitter l'ERP
        </Link>
      </div>
    </aside>
  );
}
