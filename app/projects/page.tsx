"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/data";
import { Project } from "@/types";
import { motion } from "framer-motion";
import * as React from "react";

export default function Projects() {
  const [shuffledProjects, setShuffledProjects] = React.useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = React.useState("All");
  
  React.useEffect(() => {
    const projects = getProjects();
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    setShuffledProjects(shuffled);
  }, []);
  
  const categories = ["All", ...Array.from(new Set(getProjects().map(p => p.category)))];
  
  const filteredProjects = activeCategory === "All" 
    ? shuffledProjects 
    : shuffledProjects.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-luxury-black">
      <Header />
      
      {/* Page Header */}
      <Section containerClassName="pt-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div>
            <span className="text-brand-blue text-xs font-medium tracking-[0.4em] uppercase mb-4 block">Selected Works</span>
            <h1 className="text-6xl md:text-8xl font-heading text-white">Portfolio</h1>
          </div>
          
          {/* Category Filter - Commented out for now */}
          {/* <div className="flex flex-wrap gap-4 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-widest px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-brand-blue text-white border-brand-blue" 
                    : "border-white/10 text-white/50 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div> */}
        </div>

        {/* Project Grid */}
        {/* Project Grid / Masonry */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="break-inside-avoid mb-8"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Experience Section (Light) */}
      <Section variant="light">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 py-10">
          <div className="max-w-md">
            <h2 className="text-3xl font-heading text-luxury-black mb-4 leading-tight">Experience our work in person.</h2>
            <p className="text-luxury-black/60 text-sm">
              While photographs capture the form, only a visit can reveal the true essence of our architectural achievements.
            </p>
          </div>
          <Button variant="brand" className="shrink-0">
            Schedule a Site Tour
          </Button>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
