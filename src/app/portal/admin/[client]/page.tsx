"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileVideo,
  UploadCloud,
  Trash2,
  Plus,
  CheckCircle2,
  Clock,
  Loader2,
  Save,
} from "lucide-react";
import { isAdminAuthed } from "@/lib/portal-admin";
import {
  getFiles,
  addFile,
  deleteFile,
  getInvoices,
  addInvoice,
  markInvoicePaid,
  getClientInfo,
  setClientInfo,
  type DriveFile,
  type Invoice,
} from "@/lib/portal-data";

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientName = decodeURIComponent(params.client as string);

  const [authed, setAuthed] = useState<boolean | undefined>(undefined);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [info, setInfo] = useState({ email: "", phone: "", notes: "" });
  const [infoSaved, setInfoSaved] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ concept: "", amount: "" });
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ok = isAdminAuthed();
    setAuthed(ok);
    if (!ok) router.replace("/portal/admin");
  }, [router]);

  useEffect(() => {
    if (!authed) return;
    setFiles(getFiles(clientName));
    setInvoices(getInvoices(clientName));
    setInfo(getClientInfo(clientName));
  }, [authed, clientName]);

  const uploadDelivery = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || !fileList.length) return;
      setUploading(true);
      const formData = new FormData();
      formData.append("clientName", clientName);
      for (const file of Array.from(fileList)) formData.append("files", file);
      try {
        await fetch("/api/portal/upload", { method: "POST", body: formData });
      } catch {
        // best-effort
      }
      for (const file of Array.from(fileList)) {
        addFile(clientName, { name: file.name, size: file.size, folder: "entregas" });
      }
      setFiles(getFiles(clientName));
      setUploading(false);
    },
    [clientName]
  );

  function handleDeleteFile(fileId: string) {
    deleteFile(clientName, fileId);
    setFiles(getFiles(clientName));
  }

  function handleAddInvoice(e: React.FormEvent) {
    e.preventDefault();
    const amount = Number(newInvoice.amount);
    if (!newInvoice.concept.trim() || !amount) return;
    addInvoice(clientName, { concept: newInvoice.concept, amount, status: "pendiente" });
    setInvoices(getInvoices(clientName));
    setNewInvoice({ concept: "", amount: "" });
  }

  function handleTogglePaid(invoiceId: string) {
    markInvoicePaid(clientName, invoiceId);
    setInvoices(getInvoices(clientName));
  }

  function handleSaveInfo() {
    setClientInfo(clientName, info);
    setInfoSaved(true);
    setTimeout(() => setInfoSaved(false), 1500);
  }

  if (authed === undefined || !authed) return <div className="min-h-screen bg-[#030608]" />;

  return (
    <div className="min-h-screen bg-[#030608] px-6 sm:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        <Link href="/portal/admin" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft size={15} /> Todos los clientes
        </Link>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a6b8a] to-[#4db8d4] flex items-center justify-center text-[#030608] font-semibold text-xl shrink-0">
            {clientName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">{clientName}</h1>
            <p className="text-white/40 text-sm">Cliente del portal</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Client info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 h-fit"
          >
            <p className="text-white font-medium text-sm mb-4">Información del cliente</p>
            <div className="space-y-3">
              <div>
                <label className="text-white/40 text-xs mb-1 block">Email</label>
                <input
                  type="email"
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  placeholder="cliente@email.com"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.1] px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#4db8d4]/50"
                />
              </div>
              <div>
                <label className="text-white/40 text-xs mb-1 block">Teléfono</label>
                <input
                  type="text"
                  value={info.phone}
                  onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                  placeholder="+507 6000-0000"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.1] px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#4db8d4]/50"
                />
              </div>
              <div>
                <label className="text-white/40 text-xs mb-1 block">Notas</label>
                <textarea
                  value={info.notes}
                  onChange={(e) => setInfo({ ...info, notes: e.target.value })}
                  placeholder="Preferencias, historial, contexto..."
                  rows={4}
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.1] px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#4db8d4]/50 resize-none"
                />
              </div>
              <button
                type="button"
                onClick={handleSaveInfo}
                className="flex items-center justify-center gap-2 w-full bg-[#4db8d4] hover:bg-[#a8d8e8] text-[#030608] font-medium text-sm px-4 py-2.5 rounded-lg transition-all duration-300"
              >
                {infoSaved ? <CheckCircle2 size={15} /> : <Save size={15} />}
                {infoSaved ? "Guardado" : "Guardar"}
              </button>
            </div>
          </motion.div>

          {/* Files + Invoices */}
          <div className="lg:col-span-2 space-y-6">
            {/* Deliver files */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-medium text-sm">Archivos del cliente</p>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 text-xs font-medium text-[#4db8d4] hover:text-[#a8d8e8] transition-colors"
                >
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
                  Subir entrega
                </button>
                <input ref={inputRef} type="file" multiple accept="video/*" className="hidden" onChange={(e) => uploadDelivery(e.target.files)} />
              </div>

              {files.length === 0 ? (
                <p className="text-white/30 text-sm py-6 text-center">Este cliente no tiene archivos todavía.</p>
              ) : (
                <div className="space-y-2">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2.5">
                      <FileVideo size={16} className="text-[#4db8d4] shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-sm truncate">{file.name}</p>
                        <p className="text-white/35 text-xs">
                          {file.folder === "entregas" ? "Entrega" : "Material crudo"} · {formatSize(file.size)} · {formatDate(file.uploadedAt)}
                        </p>
                      </div>
                      <button type="button" onClick={() => handleDeleteFile(file.id)} className="text-white/25 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Invoices */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
            >
              <p className="text-white font-medium text-sm mb-4">Facturas</p>

              <form onSubmit={handleAddInvoice} className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="text"
                  value={newInvoice.concept}
                  onChange={(e) => setNewInvoice({ ...newInvoice, concept: e.target.value })}
                  placeholder="Concepto (ej. Paquete Pro — agosto)"
                  className="flex-1 rounded-lg bg-white/[0.05] border border-white/[0.1] px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#4db8d4]/50"
                />
                <input
                  type="number"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                  placeholder="Monto"
                  className="sm:w-28 rounded-lg bg-white/[0.05] border border-white/[0.1] px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#4db8d4]/50"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 bg-[#4db8d4] hover:bg-[#a8d8e8] text-[#030608] font-medium text-sm px-4 py-2 rounded-lg transition-all duration-300 shrink-0"
                >
                  <Plus size={14} /> Agregar
                </button>
              </form>

              {invoices.length === 0 ? (
                <p className="text-white/30 text-sm py-4 text-center">Sin facturas registradas.</p>
              ) : (
                <div className="space-y-2">
                  {invoices.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.03] px-3 py-2.5">
                      <div className="min-w-0">
                        <p className="text-white text-sm truncate">{inv.concept}</p>
                        <p className="text-white/35 text-xs">{formatDate(inv.date)} · ${inv.amount}</p>
                      </div>
                      {inv.status === "pagada" ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full shrink-0">
                          <CheckCircle2 size={12} /> Pagada
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleTogglePaid(inv.id)}
                          className="flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 px-2.5 py-1 rounded-full transition-colors shrink-0"
                        >
                          <Clock size={12} /> Marcar pagada
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
