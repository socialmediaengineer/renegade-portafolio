"use client";

import { Monitor, Layers, Volume2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUpVariants, staggerContainerVariants, cardVariants } from "./useScrollReveal";

const services = [
  {
    icon: Monitor,
    title: "Edición Avanzada en Premiere Pro",
    description: "Multicam editing, proxy workflows, color correction con Lumetri, y técnicas avanzadas de timeline para proyectos complejos.",
  },
  {
    icon: Layers,
    title: "Motion Graphics en After Effects",
    description: "Animaciones 2D/3D, compositing avanzado, tracking de objetos, y creación de elementos gráficos dinámicos.",
  },
  {
    icon: Volume2,
    title: "Post-Producción de Audio",
    description: "Mezcla multicanal, reducción de ruido, sincronización de audio, y masterización para diferentes plataformas.",
  },
  {
    icon: Sparkles,
    title: "Efectos Visuales Avanzados",
    description: "Compositing con green screen, tracking 3D, partículas, simulaciones físicas y integración de elementos CGI.",
  },
];

export function ServicesSection() {
  const header = useScrollReveal();
  const grid = useScrollReveal();

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div ref={header.ref} initial="hidden" animate={header.controls} variants={fadeUpVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 inline-block relative">
            Servicios
            <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4db8d4] to-transparent rounded-full" />
          </h2>
          <p className="text-white/50 text-lg mt-6">
            Soluciones creativas para tus necesidades de{" "}
            <span className="text-[#a8d8e8] font-medium">edición de video</span>
          </p>
        </motion.div>

        <motion.div
          ref={grid.ref}
          initial="hidden"
          animate={grid.controls}
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="bg-white/[0.03] rounded-2xl p-8 border border-white/[0.07] hover:border-[#4db8d4]/40 hover:bg-white/[0.06] hover:shadow-[0_0_24px_rgba(77,184,212,0.12)] transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-[#1a6b8a]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1a6b8a]/35 group-hover:shadow-[0_0_20px_rgba(26,107,138,0.3)] transition-all duration-300">
                <service.icon className="w-7 h-7 text-[#4db8d4]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-4">{service.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
