import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Bell, Search } from "lucide-react";
import { DashSidebar, type DashSection } from "@/components/dashboard/Sidebar";
import { Kpis } from "@/components/dashboard/Kpis";
import { LivestockTable } from "@/components/dashboard/LivestockTable";
import { WaterMonitor } from "@/components/dashboard/WaterMonitor";
import { OrdersKanban } from "@/components/dashboard/OrdersKanban";
import { initialAlerts } from "@/lib/mockData";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Tableau de bord Éleveur — Terroir & Tech" }] }),
  component: DashboardPage,
});

const titles: Record<DashSection, { t: string; s: string }> = {
  overview: { t: "Vue globale", s: "Tout ce qui se passe sur la ferme, maintenant." },
  livestock: { t: "Cheptel", s: "Gestion des lots, santé et croissance." },
  water: { t: "IoT Bassins", s: "Surveillance temps réel des paramètres aquatiques." },
  orders: { t: "Commandes", s: "Workflow de préparation et retrait." },
};

function DashboardPage() {
  const [section, setSection] = useState<DashSection>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const crit = initialAlerts.find(a => a.level === "critical");

  return (
    <div className="dashboard-theme min-h-screen bg-background text-foreground flex">
      <DashSidebar section={section} onChange={(s) => { setSection(s); setMobileOpen(false); }} />

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-foreground/30 lg:hidden" />
            <motion.div initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} className="fixed inset-y-0 left-0 z-50 lg:hidden">
              <DashSidebar section={section} onChange={(s) => { setSection(s); setMobileOpen(false); }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-5 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 hover:bg-secondary rounded-md" onClick={() => setMobileOpen(true)}><Menu size={18} /></button>
            <div>
              <h1 className="text-base font-semibold">{titles[section].t}</h1>
              <p className="text-xs text-muted-foreground">{titles[section].s}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Rechercher animal, commande…" className="pl-9 pr-3 py-1.5 border border-border rounded-md bg-background text-sm w-72 focus:outline-none focus:ring-2 focus:ring-ring/30" />
            </div>
            <button className="relative p-2 hover:bg-secondary rounded-md">
              <Bell size={16} />
              {crit && <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full animate-pulse" />}
            </button>
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">TT</div>
          </div>
        </header>

        <div className="flex-1 p-5 lg:p-6 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={section} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {section === "overview" && (
                <div className="space-y-6">
                  <Kpis />
                  <WaterMonitor />
                </div>
              )}
              {section === "livestock" && <LivestockTable />}
              {section === "water" && <WaterMonitor />}
              {section === "orders" && <OrdersKanban />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
