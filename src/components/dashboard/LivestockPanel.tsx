import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { LivestockBatch } from "@/lib/mockData";

export function LivestockPanel({ batch }: { batch: LivestockBatch }) {
  const latest = batch.weightHistory[batch.weightHistory.length - 1].weight;
  const first = batch.weightHistory[0].weight;
  const delta = (((latest - first) / first) * 100).toFixed(1);

  return (
    <div className="p-5 space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <Mini label="Animaux" value={batch.count} />
        <Mini label="Âge" value={`${batch.ageMonths} mois`} />
        <Mini label="Plein air" value={`${batch.outdoorHours}h/j`} />
      </div>

      <div className="bg-secondary/40 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Croissance — 3 mois</div>
            <div className="text-2xl font-semibold mt-1">{latest} kg <span className="text-sm text-primary font-normal">+{delta}%</span></div>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={batch.weightHistory}>
              <CartesianGrid stroke="oklch(0.92 0.008 240)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "oklch(0.5 0.02 250)" }} tickFormatter={d => d.slice(5)} />
              <YAxis tick={{ fontSize: 10, fill: "oklch(0.5 0.02 250)" }} width={40} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid oklch(0.92 0.008 240)" }} />
              <Line type="monotone" dataKey="weight" stroke="oklch(0.65 0.16 160)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <Row label="Alimentation">{batch.diet}</Row>
        <Row label="Dernière visite vétérinaire">{new Date(batch.lastVetVisit).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}</Row>
        <Row label="Statut sanitaire"><span className="capitalize">{batch.status === "good" ? "Bon état" : batch.status === "warning" ? "Sous surveillance" : "Alerte"}</span></Row>
        <Row label="Zone">{batch.zoneId}</Row>
      </div>

      <div className="flex gap-2 pt-2">
        <button className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-medium hover:opacity-90">Programmer une visite véto</button>
        <button className="flex-1 border border-border py-2.5 rounded-md text-sm font-medium hover:bg-secondary">Modifier le lot</button>
      </div>
    </div>
  );
}

const Mini = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="bg-secondary/40 rounded-lg p-3">
    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</div>
    <div className="font-semibold mt-1">{value}</div>
  </div>
);
const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex justify-between border-b border-border pb-2">
    <span className="text-muted-foreground">{label}</span><span className="font-medium">{children}</span>
  </div>
);
