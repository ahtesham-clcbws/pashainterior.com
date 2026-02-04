"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Service } from "@/types";
import { Plus, Trash2, Save, Layers, Search, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { TagInput } from "@/components/admin/tag-input";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import Link from "next/link";

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetch("/api/admin/services")
      .then(res => res.json())
      .then(data => {
        if (data.success) setServices(data.data);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(services)
    });
    const data = await res.json();
    if (data.success) alert("Changes saved successfully");
    setIsSaving(false);
  };

  const updateServiceField = (id: string, field: keyof Service, value: any) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeService = (id: string) => {
    if (confirm("Are you sure you want to remove this service?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (isLoading) return <div className="text-white/20 italic p-20 text-center">Loading Services...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-white">Services Management</h1>
          <p className="text-foreground/40 text-sm mt-2">Edit your luxury design offerings.</p>
        </div>
        <Button onClick={handleSave} variant="brand" isLoading={isSaving} className="px-8">
          <Save size={18} className="mr-2" /> Save Changes
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue transition-colors" size={18} />
        <input 
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-brand-blue/50 transition-all placeholder:text-white/10"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredServices.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/5">
            <p className="text-white/40">{searchQuery ? "No services match your search." : "No services found."}</p>
          </div>
        )}

        {paginatedServices.map((service) => (
          <Card key={service.id} className="p-6 space-y-6 bg-luxury-gray/50 border-white/5 relative group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
                  <Layers size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-heading text-white">{service.title}</h3>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest">ID: {service.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link 
                  href={`/services/${service.slug}`} 
                  target="_blank"
                  className="p-2 text-white/20 hover:text-brand-blue transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold"
                >
                  Preview <ExternalLink size={14} />
                </Link>
                <button 
                  onClick={() => removeService(service.id)}
                  className="p-2 text-destructive/20 hover:text-destructive transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">Service Title</label>
                  <input 
                    value={service.title} 
                    onChange={(e) => updateServiceField(service.id, "title", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue/50 transition-all font-medium"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">URL Slug</label>
                  <input 
                    value={service.slug} 
                    onChange={(e) => updateServiceField(service.id, "slug", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue/50 transition-all font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">Brief Insight</label>
                  <textarea 
                    value={service.shortDescription} 
                    onChange={(e) => updateServiceField(service.id, "shortDescription", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue/50 transition-all h-24"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <RichTextEditor 
                  label="Detailed Narrative"
                  value={service.description}
                  onChange={(val) => updateServiceField(service.id, "description", val)}
                  placeholder="Elaborate on the service philosophy and execution..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <TagInput 
                label="Core Features"
                tags={service.features || []}
                onChange={(tags) => updateServiceField(service.id, "features", tags)}
                placeholder="Add a feature..."
              />
              <TagInput 
                label="Execution Process"
                tags={service.process || []}
                onChange={(tags) => updateServiceField(service.id, "process", tags)}
                placeholder="Add a process step..."
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-8 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-white/20 font-medium">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredServices.length)} of {filteredServices.length}
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
