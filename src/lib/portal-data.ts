"use client";

export type DriveFile = {
  id: string;
  name: string;
  size: number;
  folder: "material-crudo" | "entregas";
  uploadedAt: number;
};

export type Invoice = {
  id: string;
  concept: string;
  amount: number;
  date: number;
  status: "pendiente" | "pagada";
};

function key(clientName: string, kind: "files" | "invoices" | "info") {
  return `renegade_portal_${kind}_${clientName.toLowerCase().trim()}`;
}

export function getFiles(clientName: string): DriveFile[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(key(clientName, "files"));
  return raw ? JSON.parse(raw) : [];
}

export function addFile(clientName: string, file: Omit<DriveFile, "id" | "uploadedAt">) {
  const files = getFiles(clientName);
  const newFile: DriveFile = { ...file, id: crypto.randomUUID(), uploadedAt: Date.now() };
  files.push(newFile);
  window.localStorage.setItem(key(clientName, "files"), JSON.stringify(files));
  return newFile;
}

export function deleteFile(clientName: string, fileId: string) {
  const files = getFiles(clientName).filter((f) => f.id !== fileId);
  window.localStorage.setItem(key(clientName, "files"), JSON.stringify(files));
}

export function getInvoices(clientName: string): Invoice[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(key(clientName, "invoices"));
  return raw ? JSON.parse(raw) : [];
}

export function addInvoice(clientName: string, invoice: Omit<Invoice, "id" | "date">) {
  const invoices = getInvoices(clientName);
  const newInvoice: Invoice = { ...invoice, id: crypto.randomUUID(), date: Date.now() };
  invoices.unshift(newInvoice);
  window.localStorage.setItem(key(clientName, "invoices"), JSON.stringify(invoices));
  return newInvoice;
}

export function markInvoicePaid(clientName: string, invoiceId: string) {
  const invoices = getInvoices(clientName).map((inv) =>
    inv.id === invoiceId ? { ...inv, status: "pagada" as const } : inv
  );
  window.localStorage.setItem(key(clientName, "invoices"), JSON.stringify(invoices));
}

export type ClientInfo = {
  email: string;
  phone: string;
  notes: string;
};

export function getClientInfo(clientName: string): ClientInfo {
  if (typeof window === "undefined") return { email: "", phone: "", notes: "" };
  const raw = window.localStorage.getItem(key(clientName, "info"));
  return raw ? JSON.parse(raw) : { email: "", phone: "", notes: "" };
}

export function setClientInfo(clientName: string, info: ClientInfo) {
  window.localStorage.setItem(key(clientName, "info"), JSON.stringify(info));
}
