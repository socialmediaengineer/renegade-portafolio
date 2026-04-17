"use client";

import Image from "next/image";
import { Play, Mail, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { VideoModal } from "./VideoModal";

const Aurora = dynamic(() => import("./Aurora"), { ssr: false });

const words = ["profesionales", "virales", "únicos"];

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#030608]"
    >
      {/* Aurora */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#0a1a2e", "#1a6b8a", "#4db8d4"]}
          amplitude={2.5}
          blend={0.85}
          speed={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030608]/30 via-transparent to-[#030608]" />
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-[#1a6b8a]/20 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#4db8d4]/10 blur-[100px] pointer-events-none" />
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* Left */}
          <div className="space-y-10">

            {/* Badge */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#4db8d4]/60 shadow-[0_0_24px_rgba(77,184,212,0.5)]">
                <Image src="/profile.png" alt="Profile" width={56} height={56} className="w-full h-full object-cover" />
              </div>
              <span className="bg-white/5 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium border border-white/10 text-white/90 tracking-wide">
                Editor Profesional
              </span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-2">
              {/* Line 1: Creo videos — static */}
              <motion.span
                className="block text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05]"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                Creo videos
              </motion.span>

              {/* Line 2: cycling word — fixed height, no clip overflow */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    className="block text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
                    style={{
                      background: "linear-gradient(90deg, #4db8d4, #a8d8e8, #4db8d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    initial={{ opacity: 0, filter: "blur(18px)", y: 36 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(18px)", y: -36 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              className="text-white/50 text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Transformo tus ideas en{" "}
              <span className="text-[#a8d8e8] font-medium">experiencias visuales</span>{" "}
              que conectan, inspiran y generan{" "}
              <span className="text-[#a8d8e8] font-medium">resultados reales</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#portfolio"
                className="flex items-center gap-2 bg-[#4db8d4] hover:bg-[#a8d8e8] text-[#030608] font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(77,184,212,0.4)] hover:shadow-[0_0_40px_rgba(168,216,232,0.5)] hover:scale-[1.03]"
              >
                <Play size={17} fill="currentColor" />
                Ver Mi Trabajo
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 border border-white/10 hover:border-white/25 backdrop-blur-sm hover:scale-[1.03]"
              >
                <Mail size={17} />
                Contactar
              </a>
            </motion.div>
          </div>

          {/* Right - Video */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-[#1a6b8a]/30 to-[#4db8d4]/10 blur-3xl" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
              <div className="aspect-video relative">
                <Image src="/miniatura.png" alt="Mi Historia" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030608]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setActiveVideo("pFMTTRuz9nY")}
                    className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/25 transition-all duration-300 border border-white/20 shadow-[0_0_30px_rgba(77,184,212,0.4)] hover:scale-110"
                  >
                    <Play size={26} className="text-white ml-1" fill="white" />
                  </button>
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image src="/profile.png" alt="Profile" width={24} height={24} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-white/80 text-xs font-medium tracking-widest uppercase">Mi Historia</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="text-white/25" size={28} />
          </motion.div>
        </motion.div>
      </div>

      <VideoModal videoId={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
