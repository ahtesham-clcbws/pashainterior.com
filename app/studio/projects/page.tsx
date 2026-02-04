"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";
import { Save, ExternalLink, Search, ChevronLeft, ChevronRight, Briefcase, Trash2 } from "lucide-react";
import Link from "next/link";
import { TagInput } from "@/components/admin/tag-input";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetch("/api/admin/projects")
      .then(res => res.json())
      .then(data => {
        if (data.success) setProjects(data.data);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projects)
    });
    const data = await res.json();
    if (data.success) alert("Portfolio updated successfully");
    setIsSaving(false);
  };

  const updateProjectField = (id: string, field: keyof Project, value: any) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removeProject = (id: string) => {
    if (confirm("Are you sure you want to remove this project?")) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.year.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (isLoading) return <div className="text-white/20 italic p-20 text-center">Loading Portfolio...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-white">Portfolio Management</h1>
          <p className="text-foreground/40 text-sm mt-2">Curate your architectural achievements.</p>
        </div>
        <Button onClick={handleSave} variant="brand" isLoading={isSaving} className="px-8">
          <Save size={18} className="mr-2" /> Save Portfolio
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue transition-colors" size={18} />
        <input 
          type="text"
          placeholder="Search portfolio..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-brand-blue/50 transition-all placeholder:text-white/10"
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/5">
            <p className="text-white/40">{searchQuery ? "No projects match your search." : "No projects found."}</p>
          </div>
        )}

        {paginatedProjects.map((project) => (
          <Card key={project.id} className="p-6 space-y-6 bg-luxury-gray/50 border-white/5 relative group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-heading text-white">{project.title}</h3>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest">ID: {project.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link 
                  href={`/projects/${project.slug}`} 
                  target="_blank"
                  className="p-2 text-white/20 hover:text-brand-blue transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold"
                >
                  Preview <ExternalLink size={14} />
                </Link>
                <button 
                  onClick={() => removeProject(project.id)}
                  className="p-2 text-destructive/20 hover:text-destructive transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">Project Title</label>
                    <input 
                      value={project.title} 
                      onChange={(e) => updateProjectField(project.id, "title", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue/50 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">Location</label>
                    <input 
                      value={project.location} 
                      onChange={(e) => updateProjectField(project.id, "location", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue/50 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">URL Slug</label>
                    <input 
                      value={project.slug} 
                      onChange={(e) => updateProjectField(project.id, "slug", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue/50 transition-all font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">Category</label>
                    <input 
                      value={project.category} 
                      onChange={(e) => updateProjectField(project.id, "category", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue/50 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">Year</label>
                    <input 
                      value={project.year} 
                      onChange={(e) => updateProjectField(project.id, "year", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue/50 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">Surface Area</label>
                    <input 
                      value={project.area || ""} 
                      onChange={(e) => updateProjectField(project.id, "area", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue/50 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">Cover Image URL</label>
                  <input 
                    value={project.coverImage} 
                    onChange={(e) => updateProjectField(project.id, "coverImage", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue/50 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <RichTextEditor 
                  label="Architectural Narrative"
                  value={project.description}
                  onChange={(val) => updateProjectField(project.id, "description", val)}
                  placeholder="Elaborate on the design philosophy and technical specifications..."
                />

                <TagInput 
                  label="Services Delivered"
                  tags={project.services || []}
                  onChange={(tags) => updateProjectField(project.id, "services", tags)}
                  placeholder="Add a service..."
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-8 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-white/20 font-medium">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredProjects.length)} of {filteredProjects.length}
          </p>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="bg-white/5 border-white/5 text-white disabled:opacity-20"
            >
              <ChevronLeft size={16} />
            </Button>
            <div className="flex items-center space-x-1 px-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    "w-8 h-8 rounded-md text-[10px] font-bold transition-all",
                    currentPage === i + 1 ? "bg-brand-blue text-white" : "text-white/20 hover:text-white hover:bg-white/5"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="bg-white/5 border-white/5 text-white disabled:opacity-20"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";
