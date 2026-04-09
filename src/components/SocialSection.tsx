"use client";

import { Youtube, Instagram, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUpVariants, staggerContainerVariants, cardVariants } from "./useScrollReveal";

const socialLinks = [
  { icon: Youtube, title: "Mi Canal de YouTube", description: "Tutoriales y contenido exclusivo", url: "https://www.youtube.com/@renegade-" },
  { icon: Instagram, title: "Mi Instagram", description: "Behind the scenes y proyectos", url: "https://www.instagram.com/renegadedit/" },
  { icon: () => (<svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>), title: "Mi Twitter/X", description: "Actualizaciones y pensamientos", url: "https://x.com/renegadedit" },
];

export function SocialSection() {
  const header = useScrollReveal();
  const grid = useScrollReveal();

  return (
    <section id="social-networks" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div ref={header.ref} initial="hidden" animate={header.controls} variants={fadeUpVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 inline-block relative">
            Mis Redes Sociales
            <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4db8d4] to-transparent rounded-full" />
          </h2>
          <p className="text-white/50 text-lg mt-6">Sígueme para ver más contenido y mantente al día con mis últimos proyectos</p>
        </motion.div>

        <motion.div ref={grid.ref} initial="hidden" animate={grid.controls} variants={staggerContainerVariants} className="grid md:grid-cols-3 gap-6">
          {socialLinks.map((s) => (
            <motion.a key={s.title} variants={cardVariants} href={s.url} target="_blank" rel="noopener noreferrer"
              className="group bg-white/[0.03] rounded-2xl p-8 border border-white/[0.07] hover:border-[#4db8d4]/40 hover:bg-white/[0.06] hover:shadow-[0_0_24px_rgba(77,184,212,0.12)] transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4db8d4]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 bg-[#1a6b8a]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1a6b8a]/35 group-hover:shadow-[0_0_20px_rgba(26,107,138,0.3)] transition-all duration-300 text-[#4db8d4]">
                <s.icon className="w-8 h-8" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-white/50 text-sm mb-6">{s.description}</p>
              <ExternalLink size={18} className="text-[#4db8d4] group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
