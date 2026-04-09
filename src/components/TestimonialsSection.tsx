"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUpVariants, staggerContainerVariants, cardVariants } from "./useScrollReveal";

const testimonials = [
  { name: "Brian", fullName: "Brian Zaballos", subs: "201K subs", image: "https://ext.same-assets.com/310656553/658020247.png", quote: "Muy buen trabajo, exactamente lo que pedí. Lo entendió todo a la primera y el resultado fue justo lo que necesitaba.", verified: true },
  { name: "Erra", fullName: "Erra Aslani", subs: "500K subs", image: "https://ext.same-assets.com/310656553/1631395028.png", quote: "Trabajo profesional y entrega rápida. La edición ha mejorado significativamente el engagement de mis videos.", verified: true },
  { name: "sinmiedo al exito", fullName: "sinmiedo al exito", subs: "602K subs", image: "https://ext.same-assets.com/310656553/3832821329.png", quote: "La calidad de edición superó mis expectativas. Un verdadero profesional que entiende perfectamente mi audiencia. Generandole +3.5M de visitas!!", verified: true },
  { name: "Dani", fullName: "Dani Carrero", subs: "54.4K subs", image: "https://ext.same-assets.com/310656553/1862849453.png", quote: "Brutal el vídeo bro gg. Muy buen trabajo de verdad, estaba el listón muy alto y has llegado con creces.", verified: true },
];

export function TestimonialsSection() {
  const header = useScrollReveal();
  const grid = useScrollReveal();

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div ref={header.ref} initial="hidden" animate={header.controls} variants={fadeUpVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 inline-block relative">
            Testimonios
            <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4db8d4] to-transparent rounded-full" />
          </h2>
          <p className="text-white/50 text-lg mt-6">
            Lo que dicen mis clientes sobre mi <span className="text-[#a8d8e8] font-medium">trabajo profesional</span>
          </p>
        </motion.div>

        <motion.div
          ref={grid.ref}
          initial="hidden"
          animate={grid.controls}
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.fullName}
              variants={cardVariants}
              className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.07] hover:border-[#4db8d4]/40 hover:bg-white/[0.05] transition-all duration-500 group relative overflow-hidden"
            >
              {/* subtle top glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4db8d4]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center gap-3 mb-4">
                <Image src={t.image} alt={t.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                <div>
                  <h4 className="text-white font-semibold text-sm">{t.name}</h4>
                  <p className="text-white/40 text-xs">{t.fullName}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-[#1a6b8a]/20 rounded text-xs text-[#4db8d4]/80 border border-[#4db8d4]/20">{t.subs}</span>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-[#4db8d4]" fill="#4db8d4" />
                ))}
              </div>

              <p className="text-white/60 text-sm italic leading-relaxed mb-4">"{t.quote}"</p>

              {t.verified && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#4db8d4] rounded-full shadow-[0_0_6px_rgba(77,184,212,0.8)]" />
                  <span className="text-white/40 text-xs">Proyecto verificado</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
