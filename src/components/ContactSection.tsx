"use client";

import { Instagram, Mail, Calendar, ExternalLink, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUpVariants, staggerContainerVariants, cardVariants } from "./useScrollReveal";

const contactOptions = [
  { icon: Instagram, title: "Sígueme en Instagram", description: "Para ver mi trabajo diario y behind the scenes", url: "https://www.instagram.com/renegadedit/" },
  { icon: Mail, title: "Envíame un Email", description: "Para consultas profesionales y colaboraciones", url: "mailto:contacto@olletix.com" },
  { icon: Calendar, title: "Agenda una Reunión", description: "Hablemos sobre tu próximo proyecto", url: "https://calendly.com/olletix" },
];

export function ContactSection() {
  const header = useScrollReveal();
  const grid = useScrollReveal();

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div ref={header.ref} initial="hidden" animate={header.controls} variants={fadeUpVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 inline-block relative">
            Contacto
            <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4db8d4] to-transparent rounded-full" />
          </h2>
          <p className="text-white/50 text-lg mt-6">
            ¿Listo para llevar tu contenido al <span className="text-[#a8d8e8] font-medium">siguiente nivel</span>? Conectemos
          </p>
        </motion.div>

        {/* WhatsApp CTA Box */}
        <motion.div
          ref={useScrollReveal().ref}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="mb-10"
        >
          <a
            href="https://wa.me/67518476"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#0a2a1a] border border-[#25d366]/30 hover:border-[#25d366]/70 hover:bg-[#0d3320] rounded-2xl px-8 py-7 transition-all duration-400 shadow-[0_0_30px_rgba(37,211,102,0.08)] hover:shadow-[0_0_40px_rgba(37,211,102,0.18)]"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#25d366]/15 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#25d366]/25 group-hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all duration-300">
                <MessageCircle className="w-7 h-7 text-[#25d366]" />
              </div>
              <div>
                <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-1">Contacto directo</p>
                <h3 className="text-white font-bold text-xl">Escríbeme por WhatsApp</h3>
                <p className="text-white/50 text-sm mt-1">Respuesta rápida · Sin compromiso</p>
              </div>
            </div>
            <span className="shrink-0 bg-[#25d366] hover:bg-[#1ebd58] text-white font-bold text-sm px-7 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2">
              Abrir WhatsApp
              <ExternalLink size={15} />
            </span>
          </a>
        </motion.div>

        <motion.div ref={grid.ref} initial="hidden" animate={grid.controls} variants={staggerContainerVariants} className="grid md:grid-cols-3 gap-6">
          {contactOptions.map((o) => (
            <motion.a key={o.title} variants={cardVariants} href={o.url}
              target={o.url.startsWith("mailto") ? undefined : "_blank"}
              rel={o.url.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group bg-white/[0.03] rounded-2xl p-8 border border-white/[0.07] hover:border-[#4db8d4]/40 hover:bg-white/[0.06] hover:shadow-[0_0_24px_rgba(77,184,212,0.12)] transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4db8d4]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 bg-[#1a6b8a]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1a6b8a]/35 group-hover:shadow-[0_0_20px_rgba(26,107,138,0.3)] transition-all duration-300">
                <o.icon className="w-8 h-8 text-[#4db8d4]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{o.title}</h3>
              <p className="text-white/50 text-sm mb-6">{o.description}</p>
              <ExternalLink size={18} className="text-[#4db8d4] group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
