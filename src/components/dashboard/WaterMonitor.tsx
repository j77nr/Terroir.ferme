import { useState } from "react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { AlertTriangle, X, Droplets, Thermometer, Wind } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { waterMetrics, initialAlerts, type Alert } from "@/lib/mockData";

const latest = waterMetrics[waterMetrics.length - 1];
const gauges = [
  { key: "ph", label: "pH", value: latest.ph, unit: "", min: 6.5, max: 8.0, icon: Droplets },
  { key: "temp", label: "Température", value: latest.temp, unit: "°C", min: 14, max: 20, icon: Thermometer },
  { key: "oxygen", label: "Oxygène dissous", value: latest.oxygen, unit: "mg/L", min: 7.5, max: 10, icon: Wind },
];

export function WaterMonitor() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const critical = alerts.find(a => a.level === "critical");

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {critical && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-destructive text-destructive-foreground rounded-lg p-4 flex items-start gap-3"
          >
            <AlertTriangle size={18} className="mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-sm">{critical.title}</div>
              <div className="text-xs opacity-90 mt-0.5">{critical.message}</div>
            </div>
            <button onClick={() => setAlerts(a => a.filter(x => x.id !== critical.id))} className="opacity-80 hover:opacity-100">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid sm:grid-cols-3 gap-4">
        {gauges.map(g => {
          const pct = ((g.value - g.min) / (g.max - g.min)) * 100;
          const inRange = g.value >= g.min && g.value <= g.max;
          return (
            <div key={g.key} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                  <g.icon size={14} /> {g.label}
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${inRange ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                  {inRange ? "Optimal" : "Hors plage"}
                </span>
              </div>
              <div className="text-3xl font-semibold mt-3">{g.value}<span className="text-base text-muted-foreground ml-1">{g.unit}</span></div>
              <div className="mt-4 h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, Math.max(0, pct))}%` }} transition={{ duration: 1 }}
                  className={`h-full ${inRange ? "bg-primary" : "bg-destructive"}`} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>{g.min}{g.unit}</span><span>{g.max}{g.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold">Bassin B — paramètres sur 24h</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Capteurs Atlas Scientific, lecture toutes les 30 min</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart data={waterMetrics}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.16 160)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.65 0.16 160)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(0.92 0.008 240)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "oklch(0.5 0.02 250)" }} interval={3} />
              <YAxis tick={{ fontSize: 10, fill: "oklch(0.5 0.02 250)" }} domain={[6.5, 8.5]} width={30} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="ph" stroke="oklch(0.65 0.16 160)" strokeWidth={2} fill="url(#g1)" name="pH" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold mb-3">Toutes les alertes</h3>
        <div className="space-y-2">
          {alerts.length === 0 && <div className="text-sm text-muted-foreground py-4 text-center">Aucune alerte active.</div>}
          {alerts.map(a => (
            <div key={a.id} className="flex items-start gap-3 p-3 rounded-md border border-border">
              <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                a.level === "critical" ? "bg-destructive" : a.level === "warning" ? "bg-warning" : "bg-muted-foreground"
              }`} />
              <div className="flex-1">
                <div className="text-sm font-medium">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.message}</div>
              </div>
              <span className="text-xs text-muted-foreground">{a.time}</span>
              <button onClick={() => setAlerts(p => p.filter(x => x.id !== a.id))} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
