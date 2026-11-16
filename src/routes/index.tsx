import { createFileRoute } from "@tanstack/react-router";
import { PublicNavbar } from "@/components/public/Navbar";
import { Hero3D } from "@/components/public/Hero3D";
import { FarmMap } from "@/components/public/FarmMap";
import { QualityDashboard } from "@/components/public/QualityDashboard";
import { Shop } from "@/components/public/Shop";
import { Footer } from "@/components/public/Footer";
import { CartDrawer } from "@/components/public/CartDrawer";
import { CartProvider } from "@/lib/cart-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Terroir & Tech — L'élevage de demain, la transparence d'aujourd'hui" },
      { name: "description", content: "Ferme éco-responsable : bovins, volailles, porcs, lapins et truites élevés à ciel ouvert. Capteurs en temps réel, click & collect." },
      { property: "og:title", content: "Terroir & Tech — Élevage augmenté" },
      { property: "og:description", content: "Une ferme transparente, mesurée et partagée." },
    ],
  }),
  component: PublicPage,
});

function PublicPage() {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <PublicNavbar />
        <Hero3D />
        <FarmMap />
        <QualityDashboard />
        <Shop />
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
