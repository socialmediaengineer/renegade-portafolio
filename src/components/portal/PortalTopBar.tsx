"use client";

import Image from "next/image";
import Link from "next/link";

export function PortalTopBar({ clientName }: { clientName: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#050a0f]/70 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#4db8d4]/50">
            <Image
              src="/apple-touch-icon.png"
              alt="Renegade Logo"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">RENEGADE</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-white/40 text-sm hidden sm:inline">Bienvenido,</span>
          <span className="text-white font-medium text-sm">{clientName}</span>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a6b8a] to-[#4db8d4] flex items-center justify-center text-[#030608] font-semibold text-sm">
            {clientName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
