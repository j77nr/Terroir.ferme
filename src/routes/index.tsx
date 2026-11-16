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
      { name: "description", content: "Des élevages en plein air, suivis en temps réel, et des produits fermiers en vente directe." },
      { property: "og:title", content: "Terroir & Tech — Élevage augmenté" },
      { property: "og:description", content: "Des élevages en plein air, suivis en temps réel, et des produits fermiers en vente directe." },
      { property: "og:image", content: "/images/ferme-cover.png" },
      { property: "og:image:alt", content: "Élevage en plein air dans une ferme française au lever du soleil" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/images/ferme-cover.png" },
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
