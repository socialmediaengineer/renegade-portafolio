"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUpVariants, staggerContainerVariants, cardVariants } from "./useScrollReveal";

const clients = [
  { name: "Simple Wallet", handle: "simplewalletpty", followers: "100K", image: "/simple.jpg", active: true },
  { name: "Tuinity", handle: "tuinity.lat", followers: "10K", image: "/tuinity.jpg", active: true },
  { name: "Fluffy Brand", handle: "thefluffybrand", followers: "49K", image: "/fluffy.jpg", active: true },
  { name: "ADEN University", handle: "adenupa", followers: "54K", image: "/aden.jpg", active: true },
  { name: "DIACOR GPS", handle: "diacorgps", followers: "11K", image: "/diacor.jpg", active: true },
  { name: "Tyler Oliveira", handle: "tyleroliveiraofficial", followers: "1.1M", image: "/tyler.jpg", active: true },
];

export function ClientsSection() {
  const header = useScrollReveal();
  const grid = useScrollReveal();

  return (
    <section id="clients" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div ref={header.ref} initial="hidden" animate={header.controls} variants={fadeUpVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 inline-block relative">
            He Trabajado Con
            <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4db8d4] to-transparent rounded-full" />
          </h2>
          <p className="text-white/50 text-lg mt-6">
            Colaborando con <span className="text-[#a8d8e8] font-medium">marcas y creadores</span> para llevar su contenido al siguiente nivel
          </p>
        </motion.div>

        <motion.div
          ref={grid.ref}
          initial="hidden"
          animate={grid.controls}
          variants={staggerContainerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {clients.map((client) => (
            <motion.div
              key={client.handle}
              variants={cardVariants}
              className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.07] hover:border-[#4db8d4]/40 hover:bg-white/[0.06] hover:shadow-[0_0_24px_rgba(77,184,212,0.12)] transition-all duration-500 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white/10 group-hover:border-[#4db8d4]/50 transition-all duration-300 shadow-[0_0_12px_rgba(26,107,138,0.2)]">
                  <Image src={client.image} alt={client.name} width={80} height={80} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white/90 font-semibold text-sm mb-1">{client.name}</h3>
                <p className="text-white/40 text-xs mb-2">@{client.handle}</p>
                <p className="text-[#4db8d4] font-bold text-lg">{client.followers}</p>
                <p className="text-white/40 text-xs">Seguidores</p>
                {client.active && (
                  <div className="flex items-center gap-2 mt-4">
                    <span className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_6px_rgba(74,222,128,0.7)]" />
                    <span className="text-white/40 text-xs">Cliente activo</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
