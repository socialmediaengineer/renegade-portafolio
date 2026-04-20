"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUpVariants } from "./useScrollReveal";

export function CTASection() {
  const { ref, controls } = useScrollReveal();

  return (
    <section id="contact" className="w-full py-16 bg-[#030608]">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 inline-block relative">
          Trabajemos Juntos
          <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4db8d4] to-transparent rounded-full" />
        </h2>
      </div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeUpVariants}
        className="relative w-full overflow-hidden"
        style={{
          height: "480px",
          borderRadius: "4px",
          background: "linear-gradient(135deg, #030608 0%, #0a1520 40%, #1a6b8a 100%)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Glow top center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{ width: "300px", height: "300px", background: "rgba(77,184,212,0.08)", filter: "blur(60px)" }}
        />

        {/* Decorative dashed path top right */}
        <svg className="absolute right-8 top-16 opacity-20" width="220" height="200" viewBox="0 0 240 220" fill="none">
          <path d="M220 20C185 40 170 60 170 90C170 122 198 132 198 154C198 176 162 182 115 170C70 159 32 172 18 203"
            stroke="#4db8d4" strokeWidth="2.5" strokeDasharray="7 7" strokeLinecap="round" />
          <path d="M201 14L220 20L207 36" stroke="#4db8d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* White panel — same shape as reference */}
        <div
          className="absolute bg-white shadow-2xl"
          style={{
            bottom: 0,
            left: "10%",
            height: "78%",
            width: "68%",
            borderTopLeftRadius: "26px",
            borderTopRightRadius: "40px",
            clipPath: "polygon(0 0, 100% 14%, 100% 100%, 0 100%)",
          }}
        />

        {/* Left content — on top of white panel */}
        <div
          className="absolute z-10"
          style={{ left: "15%", top: "50%", transform: "translateY(-50%)", maxWidth: "400px" }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              background: "#e9f7ea",
              borderRadius: "999px",
              padding: "8px 16px",
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
            <span style={{ color: "#2ea24a", fontSize: "13px", fontWeight: 700 }}>
              Resultados Comprobados
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#0f172a", margin: 0 }}>
            Lleva tu contenido<br />
            <span style={{ color: "#1a6b8a" }}>al siguiente nivel</span>
          </h1>

          {/* Description */}
          <p style={{ marginTop: "20px", fontSize: "17px", lineHeight: 1.5, color: "#52525b", maxWidth: "380px" }}>
            Edición profesional que convierte viewers en clientes. Resultados reales para marcas reales.
          </p>

          {/* WhatsApp button */}
          <a
            href="https://wa.me/50767518476"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 transition-all duration-300 hover:scale-[1.02]"
            style={{
              marginTop: "32px",
              background: "#22c55e",
              borderRadius: "999px",
              padding: "16px 32px",
              color: "white",
              fontWeight: 700,
              fontSize: "17px",
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(34,197,94,0.35)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.857L.054 23.447a.75.75 0 00.918.918l5.59-1.479A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 01-4.964-1.362l-.355-.212-3.683.973.986-3.596-.232-.371A9.715 9.715 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            Escríbeme por WhatsApp
          </a>
        </div>

        {/* MacBook mockup — right side */}
        <div
          className="absolute z-20"
          style={{ right: "4%", top: "50%", transform: "translateY(-50%)", width: "42%" }}
        >
          <Image
            src="/macbook.png"
            alt="MacBook Pro"
            width={1000}
            height={666}
            quality={100}
            className="w-full h-auto"
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Floating logo — Premiere */}
        <motion.div
          className="absolute z-30 flex items-center justify-center bg-white rounded-full shadow-lg"
          style={{ left: "51%", top: "12%", width: "64px", height: "64px", border: "1px solid rgba(0,0,0,0.08)" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0 }}
        >
          <Image src="/premiere.png" alt="Premiere" width={40} height={40} className="object-contain" />
        </motion.div>

        {/* Floating logo — After Effects */}
        <motion.div
          className="absolute z-30 flex items-center justify-center bg-white rounded-full shadow-lg"
          style={{ right: "10%", top: "7%", width: "64px", height: "64px", border: "1px solid rgba(0,0,0,0.08)" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
        >
          <Image src="/aftereffects.png" alt="After Effects" width={40} height={40} className="object-contain" />
        </motion.div>

        {/* Floating logo — CapCut */}
        <motion.div
          className="absolute z-30 flex items-center justify-center bg-white rounded-full shadow-lg"
          style={{ right: "10%", bottom: "16%", width: "64px", height: "64px", border: "1px solid rgba(0,0,0,0.08)" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
        >
          <Image src="/capcut.png" alt="CapCut" width={40} height={40} className="object-contain" />
        </motion.div>
      </motion.div>
    </section>
  );
}
