"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  HardDrive,
  Inbox,
  PackageCheck,
  FileVideo,
  MoreVertical,
  Download,
  Trash2,
  Loader2,
} from "lucide-react";
import { getClientName } from "@/lib/portal-session";
import { getFiles, addFile, deleteFile, type DriveFile } from "@/lib/portal-data";

const STORAGE_QUOTA_BYTES = 50 * 1024 * 1024 * 1024; // 50 GB per client (1TB plan ÷ ~20 clients)

const sidebarItems: { id: "todos" | DriveFile["folder"]; label: string; icon: typeof HardDrive }[] = [
  { id: "todos", label: "Mi unidad", icon: HardDrive },
  { id: "material-crudo", label: "Material Crudo", icon: Inbox },
  { id: "entregas", label: "Entregas", icon: PackageCheck },
];

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

export default function UnidadPage() {
  const [section, setSection] = useState<"todos" | DriveFile["folder"]>("todos");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [query, setQuery] = useState("");
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const clientName = getClientName() ?? "cliente";

  useEffect(() => {
    setFiles(getFiles(clientName));
  }, [clientName]);

  const uploadFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || !fileList.length) return;
      setUploading(true);

      const formData = new FormData();
      formData.append("clientName", clientName);
      for (const file of Array.from(fileList)) formData.append("files", file);

      try {
        await fetch("/api/portal/upload", { method: "POST", body: formData });
      } catch {
        // best-effort: keep local record even if the upload endpoint fails
      }

      for (const file of Array.from(fileList)) {
        addFile(clientName, { name: file.name, size: file.size, folder: "material-crudo" });
      }
      setFiles(getFiles(clientName));
      setUploading(false);
    },
    [clientName]
  );

  function handleDelete(fileId: string) {
    deleteFile(clientName, fileId);
    setFiles(getFiles(clientName));
    setOpenMenuId(null);
  }

  const visibleFiles = useMemo(() => {
    let list = section === "todos" ? files : files.filter((f) => f.folder === section);
    if (query.trim()) {
      list = list.filter((f) => f.name.toLowerCase().includes(query.trim().toLowerCase()));
    }
    return [...list].sort((a, b) => b.uploadedAt - a.uploadedAt);
  }, [files, section, query]);

  const usedBytes = files.reduce((sum, f) => sum + f.size, 0);
  const usedPercent = Math.min(100, (usedBytes / STORAGE_QUOTA_BYTES) * 100);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        uploadFiles(e.dataTransfer.files);
      }}
      className="relative"
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="video/*"
        className="hidden"
        onChange={(e) => uploadFiles(e.target.files)}
      />

      {/* drag overlay */}
      <AnimatePresence>
        {dragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-[#030608]/90 backdrop-blur-sm flex items-center justify-center border-4 border-dashed border-[#4db8d4] rounded-2xl m-4 pointer-events-none"
          >
            <p className="text-white text-lg font-medium">Suelta los archivos para subirlos</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar — Drive style */}
        <div className="md:w-60 shrink-0">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] px-5 py-3.5 mb-5 shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-all duration-300 w-full md:w-auto"
          >
            {uploading ? (
              <Loader2 size={18} className="text-[#4db8d4] animate-spin" />
            ) : (
              <Plus size={18} className="text-[#4db8d4]" />
            )}
            <span className="text-white text-sm font-medium">Nuevo</span>
          </button>

          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = section === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
                  className={`flex items-center gap-3 w-full rounded-r-full px-4 py-2.5 text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[#4db8d4]/[0.15] text-[#4db8d4] font-medium"
                      : "text-white/55 hover:bg-white/[0.05] hover:text-white/80"
                  }`}
                >
                  <Icon size={17} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 px-4 hidden md:block">
            <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
              <HardDrive size={13} />
              Almacenamiento
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden mb-2">
              <div
                className="h-full bg-[#4db8d4] rounded-full transition-all duration-500"
                style={{ width: `${Math.max(usedPercent, 2)}%` }}
              />
            </div>
            <p className="text-white/30 text-xs">
              {formatSize(usedBytes)} de {(STORAGE_QUOTA_BYTES / (1024 * 1024 * 1024)).toFixed(0)} GB usados
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar en Mi Unidad"
                className="w-full rounded-full bg-white/[0.05] border border-white/[0.08] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#4db8d4]/50 focus:bg-white/[0.07] transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-1 rounded-full border border-white/[0.08] p-1 ml-auto">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-full transition-colors duration-200 ${viewMode === "list" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}
              >
                <List size={16} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-full transition-colors duration-200 ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>

          {visibleFiles.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] py-20 flex flex-col items-center justify-center text-center">
              <FileVideo size={30} className="text-white/15 mb-3" />
              <p className="text-white/40 text-sm">
                {query ? "No hay archivos que coincidan con tu búsqueda." : "No hay archivos aquí todavía."}
              </p>
              {section !== "entregas" && !query && (
                <p className="text-white/25 text-xs mt-1">Arrastra un video o usa el botón "Nuevo" para subirlo.</p>
              )}
            </div>
          ) : viewMode === "list" ? (
            <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
              <div className="grid grid-cols-[1fr_120px_100px_40px] gap-4 px-5 py-2.5 border-b border-white/[0.08] bg-white/[0.02] text-white/35 text-xs font-medium">
                <span>Nombre</span>
                <span className="hidden sm:block">Modificado</span>
                <span className="hidden sm:block">Tamaño</span>
                <span />
              </div>
              {visibleFiles.map((file, i) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="grid grid-cols-[1fr_120px_100px_40px] gap-4 px-5 py-3 items-center border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03] transition-colors duration-200 relative"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileVideo size={17} className="text-[#4db8d4] shrink-0" />
                    <span className="text-white text-sm truncate">{file.name}</span>
                  </div>
                  <span className="hidden sm:block text-white/40 text-xs">{formatDate(file.uploadedAt)}</span>
                  <span className="hidden sm:block text-white/40 text-xs">{formatSize(file.size)}</span>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenMenuId(openMenuId === file.id ? null : file.id)}
                      className="p-1.5 rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <MoreVertical size={15} />
                    </button>
                    {openMenuId === file.id && (
                      <div className="absolute right-0 top-9 z-20 w-40 rounded-xl border border-white/10 bg-[#0a1520] shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden">
                        <button
                          type="button"
                          className="flex items-center gap-2 w-full px-3.5 py-2.5 text-xs text-white/70 hover:bg-white/[0.06] transition-colors"
                        >
                          <Download size={13} /> Descargar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(file.id)}
                          className="flex items-center gap-2 w-full px-3.5 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={13} /> Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleFiles.map((file, i) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden hover:border-[#4db8d4]/30 transition-colors duration-300"
                >
                  <div className="aspect-video bg-white/[0.04] flex items-center justify-center">
                    <FileVideo size={26} className="text-[#4db8d4]/60" />
                  </div>
                  <div className="p-3 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-white text-xs font-medium truncate">{file.name}</p>
                      <p className="text-white/35 text-[11px] mt-0.5">{formatSize(file.size)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(file.id)}
                      className="p-1 text-white/25 hover:text-red-400 transition-colors shrink-0"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
