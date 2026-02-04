"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/types";
import { Save, Plus, Trash2, Star, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TestimonialsManagement() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetch("/api/admin/testimonials")
      .then(res => res.json())
      .then(d => {
        if (d.success) setItems(d.data);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items)
    });
    const d = await res.json();
    if (d.success) alert("Testimonials synced successfully");
    setIsSaving(false);
  };

  const updateItem = (id: string, field: keyof Testimonial, value: any) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const addItem = () => {
    const newItem: Testimonial = {
      id: `test-${Date.now()}`,
      name: "New Client",
      role: "Title",
      company: "Company Name",
      rating: 5,
      text: "Draft testimonial content...",
      date: new Date().toISOString().split('T')[0],
      projectType: "Residential"
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (confirm("Delete this testimonial?")) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const filteredItems = items.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (i.projectType || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (isLoading) return <div className="text-white/20 italic p-20 text-center">Loading Reputation Data...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-white">Guest Feedback</h1>
          <p className="text-foreground/40 text-sm mt-2">Manage your client accolades and social proof.</p>
        </div>
        <div className="flex space-x-4">
          <Button onClick={addItem} variant="outline" className="border-white/10 text-white">
            <Plus size={18} className="mr-2" /> Add Feedback
          </Button>
          <Button onClick={handleSave} variant="brand" isLoading={isSaving} className="px-8">
            <Save size={18} className="mr-2" /> Sync Records
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue transition-colors" size={18} />
        <input 
          type="text"
          placeholder="Search testimonials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-brand-blue/50 transition-all placeholder:text-white/10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/5">
            <p className="text-white/40">{searchQuery ? "No testimonials match your search." : "No feedback found."}</p>
          </div>
        )}

        {paginatedItems.map((item) => (
          <Card key={item.id} className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    onClick={() => updateItem(item.id, "rating", star)}
                    className={star <= item.rating ? "text-brand-blue" : "text-white/10"}
                  >
                    <Star size={16} fill={star <= item.rating ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="text-destructive/50 hover:text-destructive transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Client Name</label>
                <input 
                  value={item.name} 
                  onChange={(e) => updateItem(item.id, "name", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-brand-blue"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Company</label>
                <input 
                  value={item.company} 
                  onChange={(e) => updateItem(item.id, "company", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Testimonial Quote</label>
              <textarea 
                value={item.text} 
                onChange={(e) => updateItem(item.id, "text", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-brand-blue h-24 italic"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Project Scope</label>
                <input 
                  value={item.projectType} 
                  onChange={(e) => updateItem(item.id, "projectType", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-brand-blue"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Date</label>
                <input 
                  type="date"
                  value={item.date} 
                  onChange={(e) => updateItem(item.id, "date", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-brand-blue"
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
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of {filteredItems.length}
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
