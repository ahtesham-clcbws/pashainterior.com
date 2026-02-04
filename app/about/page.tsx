"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { getGlobalData } from "@/lib/data";
import { motion } from "framer-motion";
import { Target, Heart, Eye } from "lucide-react";

export default function About() {
  const { company } = getGlobalData();

  return (
    <main className="min-h-screen bg-luxury-black">
      <Header />

      {/* Hero */}
      <section className="pt-48 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-brand-blue text-xs font-semibold tracking-[0.5em] uppercase mb-10 block"
          >
            Since {company.founded}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-heading text-white mb-20 leading-[0.9] tracking-tighter"
          >
            Architectural <br />
            <span className="italic font-light text-brand-blue">Elegance.</span>
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <Section containerClassName="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="space-y-10">
          <h2 className="text-3xl font-heading text-white tracking-widest uppercase flex items-center gap-4">
            <span className="w-12 h-px bg-brand-blue" /> The Legacy
          </h2>
          <div className="space-y-8 text-white/50 text-xl leading-relaxed font-light">
            <p>
              Pasha Interior was founded with a singular purpose: to bridge the gap between engineering precision and interior aesthetics. Based in New Delhi, we have established ourselves as a premier studio for those who value structural integrity as much as visual splendor.
            </p>
            <p>
              Our studio doesn't just decorate rooms; we re-engineer living. Every column, every joint, and every texture is considered through the dual lens of technical excellence and artistic expression.
            </p>
            <p>
              Under the leadership of <span className="text-white font-medium">{company.proprietor}</span>, our team works in unison to deliver turnkey solutions that are as enduring as they are beautiful. Our engineering heritage allows us to take on complex structural challenges that traditional decorators might avoid.
            </p>
          </div>
        </div>
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video lg:aspect-4/5 rounded-2xl overflow-hidden border border-white/5 shadow-2xl"
          >
            <img
              src="/images/about/studio.png"
              alt="Pasha Interior Studio"
              className="object-cover w-full h-full grayscale"
            />
          </motion.div>
          {/* <div className="grid grid-cols-2 gap-8">
            <div className="p-8 bg-white/5 rounded-xl border border-white/5">
              <span className="text-3xl font-heading text-brand-blue block mb-2">150+</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40">Projects Delivered</span>
            </div>
            <div className="p-8 bg-white/5 rounded-xl border border-white/5">
              <span className="text-3xl font-heading text-brand-blue block mb-2">12+</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40">Design Awards</span>
            </div>
          </div> */}
        </div>
      </Section>

      {/* Vision & Mission Cards */}
      <Section containerClassName="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="p-10 bg-white/2 rounded-2xl border border-white/5 space-y-6 hover:bg-white/5 transition-colors group">
          <Target className="text-brand-blue group-hover:scale-110 transition-transform" size={32} />
          <h3 className="text-2xl font-heading text-white">Our Mission</h3>
          <p className="text-white/40 text-sm leading-relaxed">
            To provide engineering-led interior solutions that redefine the standard of luxury living through precision and structural creativity.
          </p>
        </div>
        <div className="p-10 bg-white/2 rounded-2xl border border-white/5 space-y-6 hover:bg-white/5 transition-colors group">
          <Eye className="text-brand-blue group-hover:scale-110 transition-transform" size={32} />
          <h3 className="text-2xl font-heading text-white">Our Vision</h3>
          <p className="text-white/40 text-sm leading-relaxed">
            Leading the evolution of interior architecture in India by blending technical mastery with timeless aesthetic principles.
          </p>
        </div>
        <div className="p-10 bg-white/2 rounded-2xl border border-white/5 space-y-6 hover:bg-white/5 transition-colors group">
          <Heart className="text-brand-blue group-hover:scale-110 transition-transform" size={32} />
          <h3 className="text-2xl font-heading text-white">Our Values</h3>
          <p className="text-white/40 text-sm leading-relaxed">
            Integrity, technical precision, and an unwavering commitment to the personal narratives of our clients.
          </p>
        </div>
      </Section>

      {/* Philosophy (Contrast Section) */}
      <Section className="bg-white/5 border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center py-32 space-y-12">
          <span className="text-white/30 text-xs font-semibold tracking-[0.6em] uppercase block">Spirit of Pasha</span>
          <h2 className="text-4xl md:text-6xl font-heading text-white max-w-4xl mx-auto leading-tight">
            "{company.philosophy}"
          </h2>
          <div className="mt-12 w-24 h-1 bg-brand-blue mx-auto rounded-full" />
        </div>
      </Section>

      <Footer />
    </main>
  );
}
