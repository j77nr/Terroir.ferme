import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "./mockData";

export interface CartItem { product: Product; quantity: number; }

interface CartCtx {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, q: number) => void;
  clear: () => void;
  total: number;
  count: number;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = (p: Product) => {
    setItems(prev => {
      const i = prev.find(x => x.product.id === p.id);
      if (i) return prev.map(x => x.product.id === p.id ? { ...x, quantity: x.quantity + 1 } : x);
      return [...prev, { product: p, quantity: 1 }];
    });
    setOpen(true);
  };
  const remove = (id: string) => setItems(p => p.filter(x => x.product.id !== id));
  const setQty = (id: string, q: number) =>
    setItems(p => q <= 0 ? p.filter(x => x.product.id !== id) : p.map(x => x.product.id === id ? { ...x, quantity: q } : x));
  const clear = () => setItems([]);
  const total = items.reduce((s, x) => s + x.product.price * x.quantity, 0);
  const count = items.reduce((s, x) => s + x.quantity, 0);

  return <Ctx.Provider value={{ items, open, setOpen, add, remove, setQty, clear, total, count }}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("CartProvider missing");
  return c;
};
