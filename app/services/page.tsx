"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

export default function Services() {
  const services = getServices();

  return (
    <main className="min-h-screen bg-luxury-black">
      <Header />
      
      {/* Header */}
      <Section containerClassName="pt-40">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-brand-blue text-xs font-medium tracking-[0.4em] uppercase mb-6 block">Our Expertise</span>
          <h1 className="text-5xl md:text-7xl font-heading text-white mb-8">Architectural Design Solutions</h1>
          <p className="text-foreground/50 text-lg leading-relaxed">
            From private sanctuaries to public monuments, we provide comprehensive design and construction services that prioritize structural integrity and aesthetic mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Layers;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col group" hover>
                  <div className="w-14 h-14 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-heading text-white mb-4">{service.title}</h3>
                  <p className="text-foreground/50 text-sm leading-relaxed grow">
                    {service.shortDescription}
                  </p>
                  <div className="pt-8 mt-auto">
                    <Button variant="link" className="px-0 text-brand-blue font-medium tracking-widest text-xs uppercase" asChild>
                      <Link href={`/services/${service.slug}`}>Learn More →</Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* CTA Section (Light) */}
      <Section variant="light" className="text-center">
        <div className="max-w-3xl mx-auto py-16">
          <h2 className="text-3xl md:text-5xl font-heading text-luxury-black mb-8 leading-tight">
            Ready to re-imagine <br />your space?
          </h2>
          <Button variant="brand" size="lg" asChild>
            <Link href="/contact">Book a Private Consultation</Link>
          </Button>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
