"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getClientName, setClientName } from "@/lib/portal-session";
import { registerClient } from "@/lib/portal-clients";

export default function PortalLoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const existing = getClientName();
    if (existing) {
      router.replace("/portal/dashboard/unidad");
    }
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setClientName(name);
    registerClient(name);
    router.push("/portal/dashboard/unidad");
  }

  return (
    <div className="min-h-screen bg-[#030608] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[#1a6b8a]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#4db8d4]/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-sm"
      >
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-8 shadow-[0_8px_60px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#4db8d4]/50 shadow-[0_0_24px_rgba(77,184,212,0.4)] mb-5">
              <Image
                src="/apple-touch-icon.png"
                alt="Renegade Logo"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-white text-2xl font-semibold tracking-tight">
              Portal de Clientes
            </h1>
            <p className="text-white/40 text-sm mt-2">
              Ingresa tu nombre para acceder a tus proyectos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              autoFocus
              className="w-full rounded-xl bg-white/[0.05] border border-white/[0.1] px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:border-[#4db8d4]/60 focus:bg-white/[0.07] transition-all duration-300"
            />
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full flex items-center justify-center gap-2 bg-[#4db8d4] hover:bg-[#a8d8e8] disabled:opacity-40 disabled:cursor-not-allowed text-[#030608] font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(77,184,212,0.35)] hover:shadow-[0_0_40px_rgba(168,216,232,0.45)]"
            >
              Entrar
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <Link href="/portal/admin" className="text-white/20 hover:text-white/40 text-xs transition-colors duration-200">
            Acceso administrador
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
