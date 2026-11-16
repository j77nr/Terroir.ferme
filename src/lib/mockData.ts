// Mock structured data mimicking a relational DB schema.
// Tables: livestock, weight_history, water_metrics, products, orders, alerts, farm_zones

export type LivestockCategory = "bovins" | "volailles" | "porcins" | "alevins" | "lapins";
export type HealthStatus = "good" | "warning" | "alert";

export interface WeightPoint { date: string; weight: number; }
export interface LivestockBatch {
  id: string;
  name: string;
  category: LivestockCategory;
  ageMonths: number;
  count: number;
  status: HealthStatus;
  lastVetVisit: string;
  diet: string;
  outdoorHours: number;
  weightHistory: WeightPoint[];
  zoneId: string;
}

export interface FarmZone {
  id: string;
  name: string;
  category: LivestockCategory;
  x: number; y: number; w: number; h: number;
  summary: string;
}

export interface WaterMetric { time: string; ph: number; temp: number; oxygen: number; }
export interface Product {
  id: string;
  name: string;
  category: LivestockCategory;
  price: number;
  unit: string;
  reserved: number;
  capacity: number;
  description: string;
  image: string;
}
export interface Order {
  id: string;
  client: string;
  product: string;
  quantity: number;
  total: number;
  status: "en_attente" | "prepare" | "retire";
  date: string;
}
export interface Alert {
  id: string;
  level: "info" | "warning" | "critical";
  title: string;
  message: string;
  time: string;
}

const wh = (start: number, count = 12): WeightPoint[] =>
  Array.from({ length: count }, (_, i) => ({
    date: new Date(Date.now() - (count - 1 - i) * 7 * 86400000).toISOString().slice(0, 10),
    weight: +(start + i * (start * 0.04) + (Math.random() - 0.5) * (start * 0.02)).toFixed(1),
  }));

export const farmZones: FarmZone[] = [
  { id: "z1", name: "Prairies Nord", category: "bovins", x: 5, y: 8, w: 45, h: 38, summary: "32 ha de pâturage rotatif" },
  { id: "z2", name: "Volières", category: "volailles", x: 55, y: 10, w: 28, h: 22, summary: "Parcours arborés, 2 m²/poule" },
  { id: "z3", name: "Bassins Pisciculture", category: "alevins", x: 56, y: 38, w: 35, h: 26, summary: "4 bassins, eau de source" },
  { id: "z4", name: "Clapiers Forestiers", category: "lapins", x: 8, y: 54, w: 22, h: 20, summary: "Clapiers sur sol vivant" },
  { id: "z5", name: "Vergers & Porcheries", category: "porcins", x: 34, y: 56, w: 28, h: 24, summary: "Cochons sous-bois" },
];

export const livestock: LivestockBatch[] = [
  { id: "BOV-014", name: "Lot Charolaise Aurore", category: "bovins", ageMonths: 28, count: 14, status: "good", lastVetVisit: "2025-04-12", diet: "Pâture + foin local", outdoorHours: 8, weightHistory: wh(520), zoneId: "z1" },
  { id: "BOV-015", name: "Lot Limousine Brume", category: "bovins", ageMonths: 22, count: 9, status: "warning", lastVetVisit: "2025-03-29", diet: "Pâture + céréales", outdoorHours: 7.5, weightHistory: wh(480), zoneId: "z1" },
  { id: "VOL-203", name: "Poules Rousses Pré n°2", category: "volailles", ageMonths: 6, count: 220, status: "good", lastVetVisit: "2025-04-30", diet: "Grain BIO + insectes", outdoorHours: 10, weightHistory: wh(2.1), zoneId: "z2" },
  { id: "VOL-204", name: "Chapons Festifs", category: "volailles", ageMonths: 5, count: 80, status: "good", lastVetVisit: "2025-05-01", diet: "Maïs blanc fermier", outdoorHours: 9, weightHistory: wh(3.4), zoneId: "z2" },
  { id: "POR-077", name: "Cochons Noirs Vergers", category: "porcins", ageMonths: 11, count: 18, status: "good", lastVetVisit: "2025-04-22", diet: "Glands + petit-lait", outdoorHours: 12, weightHistory: wh(95), zoneId: "z5" },
  { id: "ALE-031", name: "Truites Bassin A", category: "alevins", ageMonths: 9, count: 1400, status: "good", lastVetVisit: "2025-05-05", diet: "Granulés sans OGM", outdoorHours: 24, weightHistory: wh(0.32), zoneId: "z3" },
  { id: "ALE-032", name: "Truites Bassin B", category: "alevins", ageMonths: 7, count: 1100, status: "alert", lastVetVisit: "2025-05-10", diet: "Granulés sans OGM", outdoorHours: 24, weightHistory: wh(0.28), zoneId: "z3" },
  { id: "LAP-058", name: "Lapins Forêt Sud", category: "lapins", ageMonths: 4, count: 64, status: "good", lastVetVisit: "2025-04-18", diet: "Herbe + foin + légumes", outdoorHours: 14, weightHistory: wh(2.6), zoneId: "z4" },
];

export const waterMetrics: WaterMetric[] = Array.from({ length: 24 }, (_, i) => {
  const hour = String(i).padStart(2, "0") + "h";
  const spike = i > 18 ? 1.2 : 1;
  return {
    time: hour,
    ph: +(7.2 + Math.sin(i / 3) * 0.15).toFixed(2),
    temp: +(17.5 + Math.sin(i / 4) * 1.1 * spike).toFixed(1),
    oxygen: +(8.4 - Math.sin(i / 5) * 0.4 / spike).toFixed(2),
  };
});

export const products: Product[] = [
  { id: "P-01", name: "Colis de Bœuf Partagé", category: "bovins", price: 189, unit: "10 kg", reserved: 8, capacity: 10, description: "Filets, faux-filet, bavette, steaks hachés. Race Charolaise.", image: "beef" },
  { id: "P-02", name: "Filets de Truite Fraîche", category: "alevins", price: 24, unit: "500 g", reserved: 32, capacity: 60, description: "Truite de source élevée à basse densité.", image: "trout" },
  { id: "P-03", name: "Poulet Fermier Entier", category: "volailles", price: 22, unit: "≈ 1,8 kg", reserved: 41, capacity: 50, description: "Poule rousse, parcours plein air 10h/jour.", image: "chicken" },
  { id: "P-04", name: "Chapon de Fêtes", category: "volailles", price: 65, unit: "≈ 4 kg", reserved: 12, capacity: 40, description: "Précommande pour fin d'année.", image: "capon" },
  { id: "P-05", name: "Lapin Fermier", category: "lapins", price: 28, unit: "≈ 1,5 kg", reserved: 9, capacity: 20, description: "Élevé en clapiers forestiers.", image: "rabbit" },
  { id: "P-06", name: "Caissette de Porc Noir", category: "porcins", price: 245, unit: "12 kg", reserved: 6, capacity: 8, description: "Côtes, rôti, saucisses, lardons.", image: "pork" },
];

export const orders: Order[] = [
  { id: "CMD-2041", client: "Camille Roux", product: "Colis de Bœuf Partagé", quantity: 1, total: 189, status: "en_attente", date: "2025-05-14" },
  { id: "CMD-2042", client: "Restaurant Le Verger", product: "Filets de Truite Fraîche", quantity: 8, total: 192, status: "prepare", date: "2025-05-13" },
  { id: "CMD-2043", client: "Julie Marchand", product: "Poulet Fermier Entier", quantity: 2, total: 44, status: "en_attente", date: "2025-05-15" },
  { id: "CMD-2044", client: "Famille Bertrand", product: "Lapin Fermier", quantity: 1, total: 28, status: "retire", date: "2025-05-10" },
  { id: "CMD-2045", client: "Épicerie du Bourg", product: "Caissette de Porc Noir", quantity: 1, total: 245, status: "prepare", date: "2025-05-12" },
  { id: "CMD-2046", client: "Théo Lambert", product: "Chapon de Fêtes", quantity: 1, total: 65, status: "en_attente", date: "2025-05-16" },
];

export const initialAlerts: Alert[] = [
  { id: "A1", level: "critical", title: "Oxygène faible — Bassin B", message: "O₂ dissous à 6.8 mg/L (seuil 7.5). Vérifier oxygénateur.", time: "Il y a 12 min" },
  { id: "A2", level: "warning", title: "Stock granulés bas", message: "Plus que 14 jours de stock sur Aliments Pisciculture.", time: "Il y a 2 h" },
  { id: "A3", level: "info", title: "Visite vétérinaire prévue", message: "Lot BOV-015 — contrôle santé jeudi 09h.", time: "Hier" },
];

export const kpiData = {
  totalLivestock: livestock.reduce((s, l) => s + l.count, 0),
  activeAlerts: initialAlerts.filter(a => a.level !== "info").length,
  pendingOrders: orders.filter(o => o.status === "en_attente").length,
  feedStockDays: 14,
};
