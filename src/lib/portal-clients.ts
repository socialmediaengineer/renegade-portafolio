"use client";

const CLIENTS_KEY = "renegade_portal_all_clients";

export function registerClient(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return;
  const clients = getAllClients();
  if (!clients.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
    clients.push(trimmed);
    window.localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
  }
}

export function getAllClients(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(CLIENTS_KEY);
  return raw ? JSON.parse(raw) : [];
}
