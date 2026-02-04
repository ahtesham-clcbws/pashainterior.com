"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { 
  Mail, 
  Phone, 
  Trash2, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { ContactSubmission } from "@/types";

export default function ContactsDashboard() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/admin/contacts");
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const toggleRead = async (id: number, current: number) => {
    try {
      await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !current }),
      });
      setContacts(contacts.map(c => c.id === id ? { ...c, isRead: current ? 0 : 1 } : c));
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const deleteContact = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this inquiry record?")) return;
    
    try {
      await fetch("/api/admin/contacts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setContacts(contacts.filter(c => c.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading text-white">Private Inquiries</h1>
          <p className="text-foreground/40 text-sm mt-2">Manage all architectural and design consultations.</p>
        </div>
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-muted-foreground p-3 bg-white/5 rounded-md border border-white/5">
          <Clock size={14} className="text-brand-blue" />
          <span>Sync Status: Real-time</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue transition-colors" size={18} />
        <input 
          type="text"
          placeholder="Search by name, email or visionary statement..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-brand-blue/50 transition-all placeholder:text-white/10"
        />
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="py-20 text-center text-foreground/20 italic">Loading inquiries...</div>
        ) : filteredContacts.length === 0 ? (
          <Card className="py-20 text-center text-foreground/20 italic border-dashed">
            {searchQuery ? "No inquiries match your search." : "No consultations requested yet."}
          </Card>
        ) : (
          paginatedContacts.map((contact) => (
            <motion.div 
              layout
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className={cn(
                "p-4 md:p-6 transition-all border-white/5",
                contact.isRead ? "bg-luxury-gray/30 opacity-60" : "bg-luxury-gray/80 border-l-4 border-l-brand-blue"
              )}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                      contact.isRead ? "bg-white/5 text-foreground/40" : "bg-brand-blue text-white"
                    )}>
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-heading text-white">{contact.name}</h3>
                      <p className="text-[10px] text-foreground/40 uppercase tracking-widest">
                        {format(new Date(contact.createdAt), "MMM dd, yyyy • HH:mm")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={contact.isRead ? "text-foreground/40" : "text-brand-blue"}
                      onClick={() => toggleRead(contact.id, contact.isRead)}
                    >
                      <CheckCircle size={18} className="mr-2" />
                      {contact.isRead ? "Mark Unread" : "Mark Resolved"}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive/50 hover:text-destructive hover:bg-destructive/5"
                      onClick={() => deleteContact(contact.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                    <button 
                      onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                      className="p-2 hover:bg-white/5 rounded-full transition-colors text-foreground/40"
                    >
                      {expandedId === contact.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === contact.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-6 pt-6 border-t border-white/5 space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Contact Detail</p>
                          <div className="flex items-center space-x-4 text-sm text-foreground/70">
                            <Mail size={16} className="text-brand-blue" />
                            <span>{contact.email}</span>
                            <a href={`mailto:${contact.email}`} className="text-foreground/20 hover:text-white transition-colors">
                              <ExternalLink size={14} />
                            </a>
                          </div>
                          {contact.phone && (
                            <div className="flex items-center space-x-4 text-sm text-foreground/70">
                              <Phone size={16} className="text-brand-blue" />
                              <span>{contact.phone}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-4">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Vision Statement</p>
                          <p className="text-sm italic leading-relaxed text-foreground/60 p-4 bg-white/2 rounded-md border border-white/5">
                            "{contact.message}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-8 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-white/20 font-medium">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredContacts.length)} of {filteredContacts.length}
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

// Utility to handle types and CN helper since this is a complex UI
import { cn } from "@/lib/utils";
