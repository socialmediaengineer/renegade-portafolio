"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, HardDrive, LogOut } from "lucide-react";
import { clearClientName } from "@/lib/portal-session";

const navItems = [
  { label: "Mi Unidad", href: "/portal/dashboard/unidad", icon: HardDrive },
  { label: "Facturación", href: "/portal/dashboard/facturacion", icon: CreditCard },
];

export function PortalDock() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#050a0f]/80 backdrop-blur-2xl px-2.5 py-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="relative group">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 transition-colors duration-300 ${
                  isActive
                    ? "bg-[#4db8d4] text-[#030608]"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}

        <div className="w-px h-6 bg-white/10 mx-1" />

        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            clearClientName();
            router.push("/portal/login");
          }}
          className="flex items-center justify-center rounded-full p-2.5 text-white/40 hover:text-[#a8d8e8] hover:bg-white/[0.06] transition-colors duration-300"
          aria-label="Cerrar sesión"
        >
          <LogOut size={18} strokeWidth={2} />
        </motion.button>
      </div>
    </nav>
  );
}
