"use client";

// NOTE: this is a soft client-side gate, not real authentication.
// Anyone who reads the source can find this PIN. Once we connect a
// real backend (see chat), replace this with proper server-side auth.
export const ADMIN_PIN = "renegade2026";

const ADMIN_KEY = "renegade_portal_admin_authed";

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ADMIN_KEY) === "true";
}

export function setAdminAuthed() {
  window.localStorage.setItem(ADMIN_KEY, "true");
}

export function clearAdminAuthed() {
  window.localStorage.removeItem(ADMIN_KEY);
}
