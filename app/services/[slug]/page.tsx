"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServices } from "@/lib/data";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Layers, Palette, PencilRuler, Microscope } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as LucideIcons from "lucide-react";

export default function ServiceDetail() {
  const { slug } = useParams();
  const services = getServices();
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <main className="min-h-screen bg-luxury-black flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl font-heading mb-8">Expertise not found.</h1>
        <Button variant="brand" asChild>
          <Link href="/services">Our Capabilities</Link>
        </Button>
      </main>
    );
  }

  const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Layers;

  return (
    <main className="min-h-screen bg-luxury-black">
      <Header />
      
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/services" className="flex items-center text-brand-blue text-[10px] uppercase tracking-[0.4em] mb-12 hover:opacity-70 transition-opacity">
              <ArrowLeft size={16} className="mr-2" /> Our Expertise
            </Link>
            
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-2/3 space-y-8">
                <div className="w-16 h-16 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Icon size={32} />
                </div>
                <h1 className="text-5xl md:text-7xl font-heading text-white leading-tight">
                  {service.title}
                </h1>
                <p className="text-foreground/50 text-xl leading-relaxed font-light max-w-2xl">
                  {service.description}
                </p>
              </div>
              <div className="lg:w-1/3 w-full aspect-square rounded-lg overflow-hidden border border-white/5">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <Section containerClassName="grid grid-cols-1 md:grid-cols-2 gap-8">
        {service.features.map((feature, i) => (
          <Card key={i} className="flex items-start space-x-6">
            <div className="mt-1 text-brand-blue">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="text-xl font-heading text-white mb-2">{feature}</h3>
              <p className="text-foreground/40 text-sm">
                Meticulously executed to our strict architectural and aesthetic standards.
              </p>
            </div>
          </Card>
        ))}
      </Section>

      {/* Process Section (Light) */}
      <Section variant="light">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-20">
            <span className="text-luxury-black/40 text-xs font-medium tracking-[0.4em] uppercase mb-6 block">Methodology</span>
            <h2 className="text-4xl md:text-5xl font-heading text-luxury-black">The Pasha Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: Microscope, title: "Discovery", text: "In-depth consultation to understand your unique aspirations." },
              { icon: PencilRuler, title: "Conceptualize", text: "Architectural brainstorming and artistic visualisations." },
              { icon: Palette, title: "Curate", text: "Meticulous selection of materials, finishes, and bespoke furniture." },
              { icon: Layers, title: "Execute", text: "Engineering-led implementation with obsessive attention to detail." }
            ].map((step, i) => (
              <div key={i} className="space-y-6 text-center md:text-left">
                <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mx-auto md:mx-0">
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-heading text-luxury-black">{step.title}</h3>
                <p className="text-luxury-black/60 text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section containerClassName="text-center py-32">
        <h2 className="text-3xl md:text-5xl font-heading text-white mb-12">Experience true craftsmanship.</h2>
        <Button variant="brand" size="lg" asChild>
          <Link href="/contact">Inquire About This Service</Link>
        </Button>
      </Section>

      <Footer />
    </main>
  );
}
