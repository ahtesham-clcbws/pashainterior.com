"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectSlider } from "@/components/projects/project-slider";
import { getProjects } from "@/lib/data";
import { motion } from "framer-motion";
import { MapPin, Calendar, Maximize, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectDetail() {
  const { slug } = useParams();
  const projects = getProjects();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-luxury-black flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl font-heading mb-8">Architecture not found.</h1>
        <Button variant="brand" asChild>
          <Link href="/projects">Return to Portfolio</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-luxury-black">
      <Header />
      
      {/* Hero Image */}
      {/* Hero Section with Slider/Image Background */}
      {/* Conditional Layout: Slider vs Static Hero */}
      {(project.sliderImages && project.sliderImages.length > 0) ? (
        <>
          {/* 1. Slider Section (Standalone Full Screen) */}
          <section className="w-full h-screen relative">
            <ProjectSlider 
              images={project.sliderImages} 
              className="absolute inset-0 h-full w-full rounded-none"
              imageClassName="object-cover h-full w-full"
              autoplay={true}
            />
          </section>

          {/* 2. Project Header (Below Slider) */}
          <Section className="pt-12 pb-0">
            <div className="max-w-7xl mx-auto">
              <Link href="/projects" className="flex items-center text-brand-blue text-[10px] uppercase tracking-[0.4em] mb-8 hover:opacity-70 transition-opacity">
                <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
              </Link>
              <div className="flex flex-col gap-4">
                <span className="text-white/40 text-xs font-medium tracking-[0.4em] uppercase block">
                  {project.category}
                </span>
                <h1 className="font-heading text-white text-5xl md:text-7xl max-w-4xl leading-tight">
                  {project.title}
                </h1>
              </div>
            </div>
          </Section>
        </>
      ) : (
        /* 3. Static Hero (Image + Overlay) */
        <section className="relative h-[70vh] w-full! overflow-hidden">
          <img 
            src={project.coverImage} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-luxury-black via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-24">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link href="/projects" className="flex items-center text-brand-blue text-[10px] uppercase tracking-[0.4em] mb-8 hover:opacity-70 transition-opacity">
                  <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
                </Link>
                <span className="text-white/40 text-xs font-medium tracking-[0.4em] uppercase mb-4 block">
                  {project.category}
                </span>
                <h1 className="text-5xl md:text-7xl font-heading text-white max-w-4xl leading-tight">
                  {project.title}
                </h1>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Overview & Specs */}
      <Section className="pt-20 pb-5" containerClassName="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-heading text-white uppercase tracking-widest">The Vision</h2>
            <p className="text-foreground/60 text-lg leading-relaxed font-light">
              {project.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
            <div className="space-y-4">
              <h3 className="text-white font-medium">Services Provided</h3>
              <ul className="space-y-2">
                {project.services.map((service, i) => (
                  <li key={i} className="text-sm text-foreground/50 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mr-3" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Specs Sidebar */}
        <div className="lg:col-span-4 space-y-8 bg-white/2 p-8 rounded-lg border border-white/5 h-fit sticky top-24">
          <h3 className="text-sm uppercase tracking-widest text-brand-blue font-semibold">Project Details</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-white/5">
              <div className="flex items-center text-white/40 text-xs uppercase tracking-widest">
                <MapPin size={14} className="mr-2" /> Location
              </div>
              <div className="text-white text-sm">{project.location}</div>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-white/5">
              <div className="flex items-center text-white/40 text-xs uppercase tracking-widest">
                <Calendar size={14} className="mr-2" /> Year
              </div>
              <div className="text-white text-sm">{project.year}</div>
            </div>
            {project.area && (
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <div className="flex items-center text-white/40 text-xs uppercase tracking-widest">
                  <Maximize size={14} className="mr-2" /> Area
                </div>
                <div className="text-white text-sm">{project.area}</div>
              </div>
            )}
          </div>
          <Button variant="brand" className="w-full mt-4" asChild>
            <Link href="/contact">Inquire About Similar Project</Link>
          </Button>
        </div>
      </Section>

      {/* Gallery Grid - Bottom Position */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <Section className="pt-5">
           <div className="mb-12">
            <h2 className="text-3xl font-heading text-white mb-4">Gallery</h2>
            <div className="h-0.5 w-24 bg-brand-blue" />
          </div>
          <ProjectGallery images={project.galleryImages} />
        </Section>
      )}

      {/* Legacy/Fallback Gallery (if no specific gallery/slider images found but multiple 'images' exist) */}
      {(!project.galleryImages?.length && !project.sliderImages?.length && project.images.length > 1) && (
        <Section containerClassName="space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.slice(1).map((img, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden border border-white/5 bg-luxury-gray">
                <img src={img} alt={`${project.title} - view ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
            ))}
          </div>
        </Section>
      )}

      <Footer />
    </main>
  );
}
