"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        className={cn("group relative overflow-hidden rounded-lg bg-luxury-gray cursor-pointer", className)}
        whileHover="hover"
      >
        <motion.img
          src={project.coverImage}
          alt={project.title}
          className={cn(
            "w-full object-cover transition-transform duration-700 group-hover:scale-110",
            className?.includes('aspect') ? "h-full" : "h-auto"
          )}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-luxury-black via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
        
        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            variants={{
              hover: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-brand-blue text-xs uppercase tracking-[0.3em] font-medium mb-3">
              {project.category}
            </p>
            <h3 className="text-2xl font-heading text-white leading-tight">
              {project.title}
            </h3>
            <p className="text-white/60 text-xs mt-3 flex items-center gap-2">
              <span>{project.location}</span>
              <span className="w-1 h-1 rounded-full bg-brand-blue/50" />
              <span>{project.year}</span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
