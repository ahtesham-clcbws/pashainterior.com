"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectGrid } from "@/components/home/project-grid";
import { ClientMarque } from "@/components/home/client-marque";
import { ArrowRight, CheckCircle2, Ruler, ShieldCheck, PenTool } from "lucide-react";
import { useConsultation } from "@/components/consultation-context";

export default function Home() {
  const { openModal } = useConsultation();

  return (
    <main className="min-h-screen bg-luxury-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-linear-to-b from-luxury-black/40 via-transparent to-luxury-black/90" />
        
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('/images/hero/hero.png')] bg-cover bg-center"
        />

        <div className="container relative z-20 px-6 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-brand-blue text-xs md:text-sm font-medium tracking-[0.5em] uppercase mb-6 block">
              EST. 2020
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading text-white mb-8 leading-tight tracking-tighter">
              Bespoke <br />
              <span className="italic font-light text-brand-blue">Living.</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-sans tracking-wide leading-relaxed">
              New Delhi's premier interior studio blending structural engineering with high-end aesthetic refinement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button variant="brand" size="lg" asChild className="px-10">
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/5" onClick={openModal}>
                Private Inquiry
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        >
          <div className="w-px h-16 bg-linear-to-b from-brand-blue to-transparent" />
        </motion.div>
      </section>

      <ClientMarque />

      {/* Engineering First Section */}
      <Section containerClassName="py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className="text-brand-blue text-xs font-semibold tracking-[0.4em] uppercase">The Pasha Interior Advantage</span>
            <h2 className="text-4xl md:text-6xl font-heading text-white leading-tight">
              Engineering <br />meets <span className="italic text-brand-blue font-light">Artistry.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed max-w-xl">
              Unlike traditional decorators, we approach every space with an engineer's precision and an artist's soul. We don't just beautify; we optimize structure, flow, and longevity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-brand-blue shrink-0" size={24} />
                <div>
                  <h4 className="text-white font-medium mb-1">Structural Integrity</h4>
                  <p className="text-white/40 text-sm">Ensuring safety and durability in every renovation.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Ruler className="text-brand-blue shrink-0" size={24} />
                <div>
                  <h4 className="text-white font-medium mb-1">Precision Planning</h4>
                  <p className="text-white/40 text-sm">Meticulous measurements and CAD-driven accuracy.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PenTool className="text-brand-blue shrink-0" size={24} />
                <div>
                  <h4 className="text-white font-medium mb-1">Bespoke Design</h4>
                  <p className="text-white/40 text-sm">Custom furniture and layouts tailored to you.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-brand-blue shrink-0" size={24} />
                <div>
                  <h4 className="text-white font-medium mb-1">Turnkey Delivery</h4>
                  <p className="text-white/40 text-sm">From blueprint to handover, we handle it all.</p>
                </div>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
          >
            <img 
              src="/images/hero/engineering.png" 
              alt="Luxury Interior Workshop" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </Section>

      {/* Featured Portfolio */}
      <Section className="bg-white/2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div>
            <span className="text-brand-blue text-xs font-semibold tracking-[0.4em] uppercase mb-4 block">Selected Works</span>
            <h2 className="text-4xl md:text-6xl font-heading text-white tracking-tight">The Portfolio</h2>
          </div>
          <Button variant="link" className="text-brand-blue uppercase tracking-[0.2em] text-[10px] font-bold" asChild>
            <Link href="/projects" className="flex items-center gap-2">View Full Gallery <ArrowRight size={14} /></Link>
          </Button>
        </div>
        <ProjectGrid />
      </Section>

      {/* Visionary Philosophy */}
      <Section className="py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('/images/hero/philosophy.png')] bg-fixed" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-7xl font-heading text-white mb-10 leading-tight">
            Design is a journey <br />
            of <span className="text-brand-blue italic">discovery.</span>
          </h2>
          <p className="text-white/40 text-xl md:text-2xl leading-relaxed mb-16 font-light">
            We believe that every space has a story waiting to be told. Our process begins by listening to your aspirations and understanding your lifestyle, ensuring that every detail is meticulously crafted.
          </p>
          <Button variant="brand" size="lg" className="px-12" asChild>
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
