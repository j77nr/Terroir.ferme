import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Leaf } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export function PublicNavbar() {
  const { count, setOpen } = useCart();
  const path = useRouterState({ select: s => s.location.pathname });
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-full bg-foreground flex items-center justify-center text-background">
            <Leaf size={16} />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-lg tracking-tight">Terroir & Tech</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Élevage augmenté</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#ferme" className="hover:text-accent transition-colors">La Ferme</a>
          <a href="#qualite" className="hover:text-accent transition-colors">Qualité Live</a>
          <a href="#boutique" className="hover:text-accent transition-colors">Boutique</a>
          <Link to="/login" className="hover:text-accent transition-colors" data-status={path === "/login" ? "active" : undefined}>
            Espace Éleveur
          </Link>
        </nav>
        <button
          onClick={() => setOpen(true)}
          className="relative inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm hover:bg-foreground/90 transition-all hover:scale-[1.03]"
        >
          <ShoppingBag size={16} />
          <span className="hidden sm:inline">Panier</span>
          {count > 0 && (
            <span className="ml-1 inline-flex items-center justify-center h-5 min-w-5 rounded-full bg-accent text-accent-foreground text-[11px] font-medium px-1.5">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
