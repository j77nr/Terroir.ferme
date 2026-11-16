import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Leaf, Lock, Mail, Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Connexion Éleveur — Terroir & Tech" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("eleveur@terroir-tech.fr");
  const [password, setPassword] = useState("••••••••");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 800);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative bg-foreground text-background p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 grain opacity-30" />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-background text-foreground flex items-center justify-center"><Leaf size={16} /></div>
          <span className="font-serif text-lg">Terroir & Tech</span>
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative">
          <span className="text-xs uppercase tracking-[0.25em] text-accent">ERP Éleveur</span>
          <h2 className="font-serif text-5xl mt-4 leading-[1.05]">
            La ferme,<br /><em className="text-accent not-italic">au bout des doigts.</em>
          </h2>
          <p className="text-sm opacity-70 mt-6 max-w-sm">
            Suivez chaque lot, chaque capteur, chaque commande depuis un seul tableau de bord.
          </p>
        </motion.div>
        <div className="relative text-xs opacity-50">Accès sécurisé · TLS 1.3 · MFA disponible</div>
      </div>

      <div className="flex items-center justify-center p-8">
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={onSubmit} className="w-full max-w-sm">
          <h1 className="font-serif text-4xl">Bon retour.</h1>
          <p className="text-muted-foreground mt-2 text-sm">Connectez-vous à votre espace.</p>

          <div className="space-y-4 mt-8">
            <Field icon={<Mail size={14} />} label="Email" type="email" value={email} onChange={setEmail} />
            <Field icon={<Lock size={14} />} label="Mot de passe" type="password" value={password} onChange={setPassword} />
          </div>

          <button type="submit" disabled={loading} className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-foreground text-background rounded-full py-3.5 text-sm font-medium hover:bg-accent transition disabled:opacity-70">
            {loading ? <><Loader2 size={14} className="animate-spin" /> Connexion…</> : "Accéder au tableau de bord"}
          </button>

          <div className="text-xs text-muted-foreground text-center mt-6">
            Démo : aucun mot de passe requis. <Link to="/" className="text-accent hover:underline">Retour au site</Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

function Field({ icon, label, type, value, onChange }: { icon: React.ReactNode; label: string; type: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5 mb-2">{icon} {label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
    </label>
  );
}
