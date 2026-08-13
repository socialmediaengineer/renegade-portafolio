"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Users, FileText, HardDrive, LogOut } from "lucide-react";
import { isAdminAuthed, setAdminAuthed, clearAdminAuthed, ADMIN_PIN } from "@/lib/portal-admin";
import { getAllClients } from "@/lib/portal-clients";
import { getFiles, getInvoices } from "@/lib/portal-data";

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | undefined>(undefined);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [clients, setClients] = useState<string[]>([]);

  useEffect(() => {
    setAuthed(isAdminAuthed());
  }, []);

  useEffect(() => {
    if (authed) setClients(getAllClients());
  }, [authed]);

  function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setAdminAuthed();
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (authed === undefined) return <div className="min-h-screen bg-[#030608]" />;

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#030608] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-8"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#4db8d4]/10 border border-[#4db8d4]/30 flex items-center justify-center mb-4">
              <ShieldCheck size={22} className="text-[#4db8d4]" />
            </div>
            <h1 className="text-white text-xl font-semibold">Acceso Administrador</h1>
            <p className="text-white/40 text-sm mt-2">Solo para Renegade</p>
          </div>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(false); }}
              placeholder="PIN de acceso"
              autoFocus
              className={`w-full rounded-xl bg-white/[0.05] border px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-all duration-300 ${
                error ? "border-red-500/60" : "border-white/[0.1] focus:border-[#4db8d4]/60"
              }`}
            />
            {error && <p className="text-red-400 text-xs">PIN incorrecto.</p>}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#4db8d4] hover:bg-[#a8d8e8] text-[#030608] font-semibold px-6 py-3.5 rounded-xl transition-all duration-300"
            >
              Entrar <ArrowRight size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030608] px-6 sm:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-semibold text-white tracking-tight">Panel de Administrador</h1>
          <button
            type="button"
            onClick={() => { clearAdminAuthed(); setAuthed(false); }}
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
          >
            <LogOut size={15} /> Salir
          </button>
        </div>
        <p className="text-white/40 mb-3">Clientes registrados en el portal.</p>

        <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 mb-8">
          <p className="text-amber-300/80 text-xs leading-relaxed">
            Modo local: estos datos viven en este navegador. Para ver clientes reales desde cualquier
            dispositivo hace falta conectar una base de datos — avísame cuando quieras dar ese paso.
          </p>
        </div>

        {clients.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] py-20 flex flex-col items-center justify-center text-center">
            <Users size={28} className="text-white/20 mb-3" />
            <p className="text-white/40 text-sm">Todavía no se ha registrado ningún cliente en este navegador.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="grid grid-cols-[1fr_100px_100px_100px_40px] gap-4 px-5 py-3 border-b border-white/[0.08] bg-white/[0.02] text-white/35 text-xs font-medium">
              <span>Cliente</span>
              <span className="hidden sm:block">Facturado</span>
              <span className="hidden sm:block">Pendiente</span>
              <span className="hidden sm:block">Archivos</span>
              <span />
            </div>
            {clients.map((name, i) => {
              const invoices = getInvoices(name);
              const files = getFiles(name);
              const facturado = invoices.filter((inv) => inv.status === "pagada").reduce((s, inv) => s + inv.amount, 0);
              const pendiente = invoices.filter((inv) => inv.status === "pendiente").reduce((s, inv) => s + inv.amount, 0);
              return (
                <Link key={name} href={`/portal/admin/${encodeURIComponent(name)}`}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="grid grid-cols-[1fr_100px_100px_100px_40px] gap-4 px-5 py-4 items-center border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03] transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a6b8a] to-[#4db8d4] flex items-center justify-center text-[#030608] font-semibold text-xs shrink-0">
                        {name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white text-sm font-medium truncate">{name}</span>
                    </div>
                    <span className="hidden sm:block text-white/60 text-sm">${facturado}</span>
                    <span className="hidden sm:block text-amber-400/80 text-sm">${pendiente}</span>
                    <span className="hidden sm:flex items-center gap-1.5 text-white/40 text-sm">
                      <HardDrive size={13} /> {files.length}
                    </span>
                    <ArrowRight size={15} className="text-white/25" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
