"use client";

const STORAGE_KEY = "renegade_portal_client_name";

export function getClientName(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

export function setClientName(name: string) {
  window.localStorage.setItem(STORAGE_KEY, name.trim());
}

export function clearClientName() {
  window.localStorage.removeItem(STORAGE_KEY);
}
