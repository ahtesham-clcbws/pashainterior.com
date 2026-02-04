"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, Trash2, CheckCircle2, Clock, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function ConsultationsPage() {
  const [items, setItems] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/consultations");
    const data = await res.json();
    if (data.success) setItems(data.data);
    setIsLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch("/api/admin/consultations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus })
    });
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Permanently delete this consultation request?")) return;
    await fetch("/api/admin/consultations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchItems();
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.projectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (isLoading) return <div className="text-white/20 italic p-20 text-center">Loading Consultations...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading text-white">Consultation Requests</h1>
        <p className="text-foreground/40 text-sm mt-2">Manage private booking inquiries and project proposals.</p>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue transition-colors" size={18} />
        <input 
          type="text"
          placeholder="Search consultations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-brand-blue/50 transition-all placeholder:text-white/10"
        />
      </div>

      <div className="grid gap-6">
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/5">
            <p className="text-white/40">{searchQuery ? "No consultations match your search." : "No consultation requests yet."}</p>
          </div>
        )}

        {paginatedItems.map((item) => (
          <Card key={item.id} className="p-6 relative group overflow-hidden border-white/5 bg-luxury-gray/50 hover:bg-luxury-gray transition-colors">
            {/* Status Line */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              item.status === 'new' ? 'bg-brand-blue' : 
              item.status === 'contacted' ? 'bg-emerald-500' : 'bg-white/10'
            }`} />

            <div className="flex flex-col lg:flex-row gap-8 pl-4">
              {/* Client Info */}
              <div className="lg:w-1/3 space-y-4">
                <div>
                  <h3 className="text-xl font-heading text-white">{item.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-foreground/60">
                    <span className="flex items-center gap-2"><Mail size={14} /> {item.email}</span>
                    <span className="flex items-center gap-2"><Phone size={14} /> {item.phone}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-widest text-white/60 border border-white/5">
                    {item.projectType}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-widest text-brand-blue border border-brand-blue/20">
                    {item.budgetRange}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="lg:w-1/2 space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/30">Project Vision</label>
                <p className="text-white/80 leading-relaxed text-sm">
                  {item.description || "No specific details provided."}
                </p>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 mt-4">
                  <Calendar size={12} />
                  <span>Requested: {new Date(item.createdAt).toLocaleDateString()}</span>
                  <Clock size={12} className="ml-2" />
                  <span>{new Date(item.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="lg:w-1/6 flex flex-col justify-center gap-3 border-l border-white/5 pl-6">
                {item.status === 'new' && (
                  <Button 
                    variant="brand" 
                    size="sm" 
                    onClick={() => updateStatus(item.id, 'contacted')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-none"
                  >
                    <CheckCircle2 size={16} className="mr-2" /> Mark Contacted
                  </Button>
                )}
                
                {item.status === 'contacted' && (
                   <div className="text-center py-2 text-emerald-500 text-xs uppercase tracking-widest font-bold border border-emerald-500/20 bg-emerald-500/10 rounded-md">
                     Contacted
                   </div>
                )}

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => deleteItem(item.id)}
                  className="w-full text-destructive/60 hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 size={16} className="mr-2" /> Remove
                </Button>
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

import { cn } from "@/lib/utils";
