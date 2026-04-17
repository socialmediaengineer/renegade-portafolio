import Image from "next/image";
import { Youtube, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#1a6b8a]/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/ESLAQES.png"
              alt="Renegade Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-white font-bold text-lg tracking-wide">RENEGADE</span>
          </div>

          {/* Copyright */}
          <p className="text-white/50 text-sm">
            © 2025 Renegade. Todos los derechos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.youtube.com/@renegade-"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-[#4db8d4] transition-colors"
            >
              <Youtube size={24} />
            </a>
            <a
              href="https://www.instagram.com/renegadedit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-[#4db8d4] transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://x.com/renegadedit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-[#4db8d4] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
