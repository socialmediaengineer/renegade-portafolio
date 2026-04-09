"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUpVariants, staggerContainerVariants, cardVariants } from "./useScrollReveal";

const portfolioItems = [
  {
    title: "VSL de Negocios",
    description: "Motion Graphics pensados para transmitir calidad, elegancia y transformar viewers en clientes.",
    videoId: "MMryGLqIuFY",
    isShort: false,
  },
  {
    title: "Contenido Viral",
    description: "Estrategias de edición para maximizar el alcance y la retención.",
    videoId: "GMV_emdlgLI",
    isShort: true,
  },
  {
    title: "Edición Smooth para Viralidad",
    description: "Edición suave y profesional diseñada para enganchar y convertir.",
    videoId: "wYSnyiikFWQ",
    isShort: true,
  },
  {
    title: "Motion Graphics",
    description: "Animaciones dinámicas y efectos visuales para destacar tu contenido.",
    videoId: "VYD4CfdFftw",
    isShort: true,
  },
  {
    title: "AI UGC Ads",
    description: "Anuncios UGC generados 100% con IA — tan realistas que parecen personas reales. 30 segundos que venden.",
    videoId: "M7xa0ttDDgk",
    isShort: true,
  },
  {
    title: "Vlog & Lifestyle",
    description: "Edición de estilo de vida con un toque cinematográfico.",
    videoId: "2NktUUwDdpc",
    isShort: true,
  },
];

export function PortfolioSection() {
  const header = useScrollReveal();
  const grid = useScrollReveal();

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div ref={header.ref} initial="hidden" animate={header.controls} variants={fadeUpVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 inline-block relative">
            Portfolio
            <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4db8d4] to-transparent rounded-full" />
          </h2>
          <p className="text-white/50 text-lg mt-6">
            Explora mi trabajo y descubre la <span className="text-[#a8d8e8] font-medium">calidad profesional</span> que puedo aportar a tus proyectos
          </p>
        </motion.div>

        <motion.div
          ref={grid.ref}
          initial="hidden"
          animate={grid.controls}
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioItems.map((item) => (
            <motion.a
              key={item.videoId}
              variants={cardVariants}
              href={item.isShort ? `https://www.youtube.com/shorts/${item.videoId}` : `https://www.youtube.com/watch?v=${item.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/[0.03] rounded-2xl overflow-hidden border border-white/[0.07] hover:border-[#4db8d4]/40 hover:shadow-[0_0_24px_rgba(77,184,212,0.12)] transition-all duration-500"
            >
              <div className={`relative overflow-hidden ${item.isShort ? "aspect-[9/16] max-h-[320px]" : "aspect-video"}`}>
                <Image
                  src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                  <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300 border border-white/20 shadow-[0_0_20px_rgba(77,184,212,0.4)]">
                    <Play size={22} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                {item.isShort && (
                  <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                    <span className="text-white/70 text-xs font-medium tracking-wide">SHORT</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#4db8d4] rounded-full shadow-[0_0_8px_rgba(77,184,212,0.9)]" />
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{item.description}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
