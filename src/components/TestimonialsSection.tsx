"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUpVariants } from "./useScrollReveal";

export function TestimonialsSection() {
  const header = useScrollReveal();
  const reviews = useScrollReveal();

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

        {/* Google Reviews widget */}
        <motion.div
          ref={reviews.ref}
          initial="hidden"
          animate={reviews.controls}
          variants={fadeUpVariants}
        >
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className="elfsight-app-2103c2e5-cb13-4e11-af39-b12a42b419bc" data-elfsight-app-lazy />
        </motion.div>
      </div>
    </section>
  );
}
