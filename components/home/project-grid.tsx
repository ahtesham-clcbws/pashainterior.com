"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { getProjects } from "@/lib/data";
import { Project } from "@/types";

export function ProjectGrid() {
  const [randomProjects, setRandomProjects] = useState<Project[]>([]);

  useEffect(() => {
    const projects = getProjects();
    // Shuffle and pick 3
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    setRandomProjects(shuffled.slice(0, 3));
  }, []);

  if (randomProjects.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="aspect-4/5 rounded-lg bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {randomProjects.map((project) => (
        <ProjectCard key={project.id} project={project} className="aspect-4/5" />
      ))}
    </div>
  );
}
