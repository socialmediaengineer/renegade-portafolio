"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, Clock } from "lucide-react";
import { getClientName } from "@/lib/portal-session";
import { getInvoices, type Invoice } from "@/lib/portal-data";

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

export default function FacturacionPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const clientName = getClientName() ?? "cliente";

  useEffect(() => {
    setInvoices(getInvoices(clientName));
  }, [clientName]);

  const totalPagado = invoices.filter((i) => i.status === "pagada").reduce((s, i) => s + i.amount, 0);
  const totalPendiente = invoices.filter((i) => i.status === "pendiente").reduce((s, i) => s + i.amount, 0);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Facturación</h1>
        <p className="text-white/40 mt-2">Historial de lo que Renegade te ha cobrado.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
          <p className="text-white/40 text-xs mb-1.5">Total pagado</p>
          <p className="text-white text-2xl font-semibold">${totalPagado}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
          <p className="text-white/40 text-xs mb-1.5">Pendiente</p>
          <p className="text-white text-2xl font-semibold">${totalPendiente}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center gap-2">
          <FileText size={16} className="text-white/40" />
          <p className="text-white/60 text-sm font-medium">Historial de facturas</p>
        </div>

        {invoices.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <FileText size={28} className="text-white/20 mb-3" />
            <p className="text-white/40 text-sm">Aún no tienes facturas registradas.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {invoices.map((inv, i) => (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="px-6 py-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{inv.concept}</p>
                  <p className="text-white/40 text-xs mt-0.5">{formatDate(inv.date)}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-white font-medium text-sm">${inv.amount}</span>
                  {inv.status === "pagada" ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                      <CheckCircle2 size={13} /> Pagada
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                      <Clock size={13} /> Pendiente
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
