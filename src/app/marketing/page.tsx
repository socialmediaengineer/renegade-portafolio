"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronDown, Menu, MessageCircle, Star } from "lucide-react";
import { VideoModal } from "@/components/VideoModal";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
type Lang = "es" | "en";

const translations = {
  es: {
    nav: ["Portfolio", "Clientes", "Proceso", "FAQ", "Contacto"],
    navHref: ["#portfolio", "#clients", "#process", "#faq", "#contact"],
    cta: "Contrátame",
    hero: {
      badge: "Editor Profesional",
      line1: "Video Editing",
      line2: "Reinventado.",
      sub: "Transformo contenido ordinario en experiencias visuales extraordinarias. Estilo limpio, ritmo perfecto, resultados reales.",
      btn1: "Ver Portfolio",
      btn2: "Escribirme por WhatsApp",
      stat1v: "+50M", stat1l: "Visitas Generadas",
      stat2v: "30+",  stat2l: "Creators Top",
      stat3v: "5.0",  stat3l: "Rating Cliente",
    },
    clients: {
      label: "Confían en mí",
      title: "Creadores que Confían en Mí",
      sub: "Colaboro con algunos de los creadores más exitosos de habla hispana",
    },
    portfolio: {
      label: "Portafolio",
      title: "Portfolio",
      sub: "Una selección de mis mejores trabajos",
    },
    viewerT: {
      label: "Testimonios",
      title: "Impacto en la audiencia",
      sub: "Lo que dicen los espectadores reales en los comentarios de los vídeos.",
    },
    clientT: {
      label: "Clientes",
      title: "Testimonios de clientes",
      sub: "Lo que dicen los creadores y marcas que han trabajado conmigo",
    },
    process: {
      label: "Mi proceso",
      title: "Mi método en 5 pasos.",
      steps: [
        { n: "01", title: "Análisis del contenido", desc: "Primero analizo tu contenido actual, detecto áreas de mejora y entiendo tu estilo y audiencia objetivo." },
        { n: "02", title: "Idea y estructura", desc: "Desarrollo la idea del vídeo y la estructura narrativa para maximizar retención y engagement." },
        { n: "03", title: "Grabación del contenido", desc: "Tú grabas siguiendo la estructura definida. Te guío para que el material sea óptimo para la edición." },
        { n: "04", title: "Edición", desc: "Edición completa: montaje, motion graphics, SFX, corrección de color y ajustes visuales. Todo orientado al mensaje y la experiencia del espectador.", tags: ["Montaje", "Motion graphics", "SFX", "Color grading"] },
        { n: "05", title: "Revisión y entrega", desc: "Entrego el vídeo para revisión. Revisiones hasta que quedes 100% satisfecho con el resultado." },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Qué tipo de vídeos editas?", a: "Edito vídeos de YouTube (formato largo y corto), VSLs, anuncios para redes sociales y contenido para marcas y empresas. Cualquier tipo de contenido que necesite una edición profesional." },
        { q: "¿Participas solo en la edición o también en el proceso creativo?", a: "Me involucro en todo el proceso. Desde la idea y la estructura del vídeo hasta la edición final. Mi objetivo es que el contenido conecte con tu audiencia y genere resultados." },
        { q: "¿Cuánto tarda un proyecto?", a: "Para vídeos de YouTube: 3-7 días. Para Shorts y contenido de formato corto: 24-48h. Para VSLs y proyectos complejos: 7-14 días. Siempre acordamos los plazos antes de empezar." },
        { q: "¿Cómo funciona el proceso de revisión?", a: "Entrego los vídeos para que puedas revisarlos y marcar exactamente qué quieres cambiar. Incluyo revisiones ilimitadas hasta que estés 100% satisfecho." },
        { q: "¿Trabajas con clientes internacionales?", a: "Sí, trabajo con clientes de todo el mundo. Me comunico en español e inglés y me adapto a cualquier zona horaria." },
        { q: "¿Qué incluye el servicio?", a: "Incluye edición completa del vídeo, motion graphics, SFX, corrección de color, subtítulos (si aplica) y revisiones ilimitadas." },
      ],
    },
    contact: {
      label: "Contacto",
      title: "Trabajemos juntos.",
      sub: "Cuéntame sobre tu proyecto y descubramos cómo elevar tu contenido.",
      whatsapp: "Escríbeme por WhatsApp",
      guarantee: "Respuesta garantizada en menos de 24h.",
    },
    footer: { rights: "© 2026 Renegade. Todos los derechos reservados." },
  },
  en: {
    nav: ["Portfolio", "Clients", "Process", "FAQ", "Contact"],
    navHref: ["#portfolio", "#clients", "#process", "#faq", "#contact"],
    cta: "Hire Me",
    hero: {
      badge: "Professional Editor",
      line1: "Video Editing",
      line2: "Reinvented.",
      sub: "I transform ordinary content into extraordinary visual experiences. Clean style, perfect rhythm, real results.",
      btn1: "View Portfolio",
      btn2: "Message me on WhatsApp",
      stat1v: "+50M", stat1l: "Generated Views",
      stat2v: "30+",  stat2l: "Top Creators",
      stat3v: "5.0",  stat3l: "Client Rating",
    },
    clients: {
      label: "Trusted by",
      title: "Creators Who Trust Me",
      sub: "I collaborate with some of the most successful Spanish-speaking creators",
    },
    portfolio: {
      label: "Portfolio",
      title: "Portfolio",
      sub: "A selection of my best work",
    },
    viewerT: {
      label: "Testimonials",
      title: "Audience Impact",
      sub: "What real viewers say in the video comments.",
    },
    clientT: {
      label: "Clients",
      title: "Client Testimonials",
      sub: "What creators and brands who have worked with me say",
    },
    process: {
      label: "My Process",
      title: "My 5-step method.",
      steps: [
        { n: "01", title: "Content Analysis", desc: "I analyze your current content, detect areas for improvement and understand your style and target audience." },
        { n: "02", title: "Idea & Structure", desc: "I develop the video idea and narrative structure to maximize retention and engagement." },
        { n: "03", title: "Recording", desc: "You record following the defined structure. I guide you so the footage is optimal for editing." },
        { n: "04", title: "Editing", desc: "Full editing: cutting, motion graphics, SFX, color grading and visual adjustments. All focused on message and viewer experience.", tags: ["Cutting", "Motion graphics", "SFX", "Color grading"] },
        { n: "05", title: "Review & Delivery", desc: "I deliver the video for review. Revisions until you are 100% satisfied with the result." },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        { q: "What types of videos do you edit?", a: "I edit YouTube videos (long and short format), VSLs, social media ads, and content for brands and businesses. Any content that needs professional editing." },
        { q: "Do you only do editing or also creative work?", a: "I get involved in the entire process, from the idea and structure of the video to the final edit. My goal is for the content to connect with your audience and generate real results." },
        { q: "How long does a project take?", a: "YouTube videos: 3-7 days. Shorts and short-format content: 24-48h. VSLs and complex projects: 7-14 days. We always agree on deadlines before starting." },
        { q: "How does the revision process work?", a: "I deliver the videos for you to review and mark exactly what you want changed. Unlimited revisions included until you are 100% satisfied." },
        { q: "Do you work with international clients?", a: "Yes, I work with clients worldwide. I communicate in Spanish and English and adapt to any time zone." },
        { q: "What is included in the service?", a: "Full video editing, motion graphics, SFX, color grading, subtitles (if applicable), and unlimited revisions." },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let's work together.",
      sub: "Tell me about your project and let's discover how to elevate your content.",
      whatsapp: "Message me on WhatsApp",
      guarantee: "Guaranteed response in less than 24h.",
    },
    footer: { rights: "© 2026 Renegade. All rights reserved." },
  },
} as const;

// ─── DATA ──────────────────────────────────────────────────────────────────────

const portfolioItems = [
  { title: "VSL de Negocios", videoId: "OqHKptkm6CQ", isShort: false },
  { title: "Motion Graphics",  videoId: "VYD4CfdFftw", isShort: true },
  { title: "Vlog & Lifestyle", videoId: "2NktUUwDdpc", isShort: true },
  { title: "Videos para SaaS", videoId: "v5yvJBUaRvY", isShort: false },
  { title: "Edición Smooth",   videoId: "wYSnyiikFWQ", isShort: true },
  { title: "AI UGC Ads",       videoId: "M7xa0ttDDgk", isShort: true },
];

const viewerComments = [
  { text: "Más que un vídeo, parece una película. Qué locura de vídeo y qué gran edición.", user: "@brabranai" },
  { text: "Increíble, se me han saltado las lágrimas.", user: "@germanroldan4897" },
  { text: "La forma en la que está contado el vídeo me puso los pelos de punta.", user: "@Sergiix1" },
  { text: "Me encantó todo del vídeo: la edición y cómo contaste la historia.", user: "@oliviatodesco" },
  { text: "Increíble la edición y la currada de los vídeos, felicidades.", user: "@navaas09" },
  { text: "La calidad del contenido es impecable en todo sentido.", user: "@edgardcondd" },
  { text: "La calidad de tus vídeos es sencillamente impresionante.", user: "@starshooted" },
  { text: "Sinceramente, era el vídeo y las palabras que necesitaba hoy. Trabajazo.", user: "@brewtank_" },
];

const clientTestimonials = [
  { quote: "Brutal el vídeo bro gg. Muy buen trabajo de verdad, estaba el listón muy alto y has llegado con creces.", name: "Dani Carrero", subs: "63.3K subs" },
  { quote: "Trabajo profesional y entrega rápida. La edición ha mejorado significativamente el engagement.", name: "Erra Aslani", subs: "588K subs" },
  { quote: "La calidad de edición superó mis expectativas. +3.5M de visitas generadas.", name: "sinmiedo al exito", subs: "617K subs" },
  { quote: "Muy buen trabajo, exactamente lo que pedí. Lo entendió todo a la primera.", name: "Brian Zaballos", subs: "185K subs" },
  { quote: "Te has adaptado rapidísimo al estilo del canal y ya hemos conseguido varios vídeos con millones de visitas.", name: "Tecnonauta", subs: "9.07M subs" },
  { quote: "El Video 10/10, esto es una locura!!", name: "Carlos Espárraga", subs: "169K subs" },
];

const clients = [
  "Tecnonauta · 9.07M", "sinmiedo al exito · 617K", "Erra Aslani · 588K",
  "Kainihon · 450K", "Full Músculo · 275K", "Carlos Espárraga · 169K",
  "Robert Sielmann · 154K", "Brian Zaballos · 185K", "Tokin Privacy · 123K",
  "Dani Carrero · 63.3K", "Golden Circle · 79K", "Víctor Heras · 103K",
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function MarketingPage() {
  const [lang, setLang] = useState<Lang>("es");
  const [activeVideo, setActiveVideo] = useState<{ id: string; isShort: boolean } | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const txt = translations[lang];

  return (
    <div className="min-h-screen bg-[#030608] text-white">

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050a0f]/95 backdrop-blur-sm border-b border-[#1a6b8a]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#4db8d4]/50 shadow-[0_0_12px_rgba(77,184,212,0.3)]">
                <Image src="/apple-touch-icon.png" alt="Renegade" width={36} height={36} className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg tracking-wider">RENEGADE</span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {txt.nav.map((label, i) => (
                <a key={i} href={txt.navHref[i]} className="text-white/60 hover:text-[#4db8d4] text-sm font-medium transition-colors">
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLang(l => l === "es" ? "en" : "es")}
                className="text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 text-white/60 hover:text-[#4db8d4] hover:border-[#4db8d4]/50 transition-all"
              >
                {lang === "es" ? "EN" : "ES"}
              </button>
              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 bg-[#4db8d4] hover:bg-[#a8d8e8] text-[#030608] font-bold px-4 py-2 rounded-full text-sm transition-all"
              >
                {txt.cta}
              </a>
              <button className="md:hidden text-white p-1" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <nav className="md:hidden py-4 border-t border-[#1a6b8a]/30 flex flex-col gap-4">
              {txt.nav.map((label, i) => (
                <a key={i} href={txt.navHref[i]} className="text-white/70 hover:text-[#4db8d4] text-sm font-medium" onClick={() => setMobileOpen(false)}>
                  {label}
                </a>
              ))}
              <a href="#contact" className="bg-[#4db8d4] text-[#030608] font-bold px-4 py-2 rounded-full text-sm text-center">
                {txt.cta}
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#1a6b8a]/12 blur-[140px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="inline-flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#4db8d4]/60 shadow-[0_0_20px_rgba(77,184,212,0.4)]">
              <Image src="/profile.png" alt="Renegade" width={44} height={44} className="w-full h-full object-cover" />
            </div>
            <span className="bg-white/5 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium border border-white/10 text-white/90">
              {txt.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mb-6">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]">
              <span className="text-white">{txt.hero.line1}</span>
              <br />
              <span style={{ background: "linear-gradient(90deg,#4db8d4,#a8d8e8,#4db8d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {txt.hero.line2}
              </span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            {txt.hero.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-wrap gap-4 justify-center mb-16">
            <a href="#portfolio" className="flex items-center gap-2 bg-[#4db8d4] hover:bg-[#a8d8e8] text-[#030608] font-bold px-7 py-3.5 rounded-full transition-all shadow-[0_0_30px_rgba(77,184,212,0.4)] hover:scale-[1.03]">
              <Play size={16} fill="currentColor" />
              {txt.hero.btn1}
            </a>
            <a href="https://wa.me/50767518476" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold px-7 py-3.5 rounded-full transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-[1.03]">
              <MessageCircle size={16} />
              {txt.hero.btn2}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-wrap justify-center gap-14">
            {([
              [txt.hero.stat1v, txt.hero.stat1l],
              [txt.hero.stat2v, txt.hero.stat2l],
              [txt.hero.stat3v, txt.hero.stat3l],
            ] as [string, string][]).map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-4xl font-black text-white">{val}</div>
                <div className="text-white/40 text-sm mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CLIENTS MARQUEE ── */}
      <section id="clients" className="py-16 border-y border-white/[0.05] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-10">
          <span className="text-[#4db8d4] text-xs font-bold uppercase tracking-widest">{txt.clients.label}</span>
          <h2 className="text-3xl font-bold text-white mt-2">{txt.clients.title}</h2>
          <p className="text-white/40 text-sm mt-2">{txt.clients.sub}</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-6 w-max" style={{ animation: "marquee 28s linear infinite" }}>
            {[...clients, ...clients].map((c, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-3 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#4db8d4] shadow-[0_0_6px_rgba(77,184,212,0.8)] shrink-0" />
                <span className="text-white/80 font-medium text-sm">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#4db8d4] text-xs font-bold uppercase tracking-widest">{txt.portfolio.label}</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4 relative inline-block">
              {txt.portfolio.title}
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4db8d4] to-transparent rounded-full" />
            </h2>
            <p className="text-white/50 text-lg mt-6">{txt.portfolio.sub}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <div
                key={item.videoId}
                onClick={() => setActiveVideo({ id: item.videoId, isShort: item.isShort })}
                className="group bg-white/[0.03] rounded-2xl overflow-hidden border border-white/[0.07] hover:border-[#4db8d4]/40 hover:shadow-[0_0_24px_rgba(77,184,212,0.12)] transition-all duration-500 cursor-pointer"
              >
                <div className={`relative overflow-hidden ${item.isShort ? "aspect-[9/16] max-h-[320px]" : "aspect-video"}`}>
                  <Image
                    src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all border border-white/20 shadow-[0_0_20px_rgba(77,184,212,0.4)]">
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
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIEWER TESTIMONIALS ── */}
      <section className="py-20 overflow-hidden border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <span className="text-[#4db8d4] text-xs font-bold uppercase tracking-widest">{txt.viewerT.label}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">{txt.viewerT.title}</h2>
          <p className="text-white/40 mt-3">{txt.viewerT.sub}</p>
        </div>

        {/* Row 1 — left */}
        <div className="overflow-hidden mb-4">
          <div className="flex gap-4 w-max" style={{ animation: "marquee 32s linear infinite" }}>
            {[...viewerComments, ...viewerComments].map((c, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 w-72 shrink-0">
                <p className="text-white/70 text-sm italic leading-relaxed mb-3">&quot;{c.text}&quot;</p>
                <span className="text-[#4db8d4] text-xs font-semibold">{c.user}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="overflow-hidden">
          <div className="flex gap-4 w-max" style={{ animation: "marqueeReverse 32s linear infinite" }}>
            {[...viewerComments.slice(4), ...viewerComments.slice(0, 4), ...viewerComments].map((c, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 w-72 shrink-0">
                <p className="text-white/70 text-sm italic leading-relaxed mb-3">&quot;{c.text}&quot;</p>
                <span className="text-[#4db8d4] text-xs font-semibold">{c.user}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#4db8d4] text-xs font-bold uppercase tracking-widest">{txt.clientT.label}</span>
            <h2 className="text-4xl font-bold text-white mt-3">{txt.clientT.title}</h2>
            <p className="text-white/40 mt-3">{txt.clientT.sub}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientTestimonials.map((t, i) => (
              <div key={i} className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.07] hover:border-[#4db8d4]/30 hover:bg-white/[0.05] transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4db8d4]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-[#4db8d4]" fill="#4db8d4" />)}
                </div>
                <p className="text-white/70 text-sm italic leading-relaxed mb-5">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#4db8d4] shadow-[0_0_6px_rgba(77,184,212,0.8)]" />
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-white/30 text-xs">{t.subs}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050a0f]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#4db8d4] text-xs font-bold uppercase tracking-widest">{txt.process.label}</span>
            <h2 className="text-4xl font-bold text-white mt-3">{txt.process.title}</h2>
          </div>

          <div className="space-y-4">
            {txt.process.steps.map((step, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-[#4db8d4]/30 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <span className="text-[#4db8d4] font-black text-xl font-mono shrink-0 mt-0.5">{step.n}</span>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                    {"tags" in step && step.tags && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {(step.tags as readonly string[]).map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-[#1a6b8a]/20 border border-[#4db8d4]/20 rounded-full text-[#4db8d4] text-xs font-medium">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#4db8d4] text-xs font-bold uppercase tracking-widest">{txt.faq.label}</span>
            <h2 className="text-4xl font-bold text-white mt-3">{txt.faq.title}</h2>
          </div>

          <div className="space-y-3">
            {txt.faq.items.map((item, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#4db8d4]/30 transition-colors duration-300">
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                >
                  <span className="text-white font-medium text-sm">{item.q}</span>
                  <ChevronDown size={18} className={`text-[#4db8d4] shrink-0 transition-transform duration-300 ${faqOpen === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 border-t border-white/[0.05]">
                        <p className="text-white/50 text-sm leading-relaxed pt-4">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#050a0f]">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[#4db8d4] text-xs font-bold uppercase tracking-widest">{txt.contact.label}</span>
          <h2 className="text-5xl sm:text-6xl font-black text-white mt-4 mb-4 leading-tight">{txt.contact.title}</h2>
          <p className="text-white/40 text-lg mb-12">{txt.contact.sub}</p>

          <a
            href="https://wa.me/50767518476"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold px-9 py-4 rounded-full text-lg transition-all hover:scale-[1.03] shadow-[0_8px_30px_rgba(34,197,94,0.3)] mb-6"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.857L.054 23.447a.75.75 0 00.918.918l5.59-1.479A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 01-4.964-1.362l-.355-.212-3.683.973.986-3.596-.232-.371A9.715 9.715 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            {txt.contact.whatsapp}
          </a>

          <p className="text-white/30 text-sm">{txt.contact.guarantee}</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-4 border-t border-[#1a6b8a]/30">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/apple-touch-icon.png" alt="Renegade" width={28} height={28} className="w-7 h-7 rounded-full object-cover" />
            <span className="font-bold tracking-wide">RENEGADE</span>
          </div>
          <p className="text-white/30 text-sm">{txt.footer.rights}</p>
          <div className="flex items-center gap-5 text-white/30 text-sm">
            <Link href="/" className="hover:text-[#4db8d4] transition-colors">← renegadedit.com</Link>
            <a href="https://www.instagram.com/renegadedit/" target="_blank" rel="noopener noreferrer" className="hover:text-[#4db8d4] transition-colors">Instagram</a>
            <a href="https://www.youtube.com/@renegade-" target="_blank" rel="noopener noreferrer" className="hover:text-[#4db8d4] transition-colors">YouTube</a>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <VideoModal
        videoId={activeVideo?.id ?? null}
        isShort={activeVideo?.isShort}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
