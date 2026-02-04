"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getGlobalData } from "@/lib/data";
import { Save, Map } from "lucide-react";

export default function SettingsManagement() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(d => {
        if (d.success) setData(d.data);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const d = await res.json();
    if (d.success) alert("Global settings updated. Please refresh the frontend to see changes.");
    setIsSaving(false);
  };

  const updateCompanyField = (field: string, value: any) => {
    setData({ ...data, company: { ...data.company, [field]: value } });
  };

  const updateContactField = (field: string, value: any) => {
    setData({ ...data, contact: { ...data.contact, [field]: value } });
  };

  if (isLoading) return <div className="text-white/20 italic p-20 text-center">Loading Settings...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-white">Corporate Identity</h1>
          <p className="text-foreground/40 text-sm mt-2">Manage your global brand presence.</p>
        </div>
        <Button onClick={handleSave} variant="brand" isLoading={isSaving} className="px-8">
          <Save size={18} className="mr-2" /> Sync Brand Data
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Company Settings */}
        <div className="space-y-8">
          <h2 className="text-lg font-heading text-white border-b border-white/5 pb-4">Brand Information</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Full Corporate Name</label>
              <input 
                value={data.company.name} 
                onChange={(e) => updateCompanyField("name", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Short Name (For Nav/Logo)</label>
              <input 
                value={data.company.shortName} 
                onChange={(e) => updateCompanyField("shortName", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Tagline</label>
              <input 
                value={data.company.tagline} 
                onChange={(e) => updateCompanyField("tagline", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Brand Philosophy</label>
              <textarea 
                value={data.company.philosophy} 
                onChange={(e) => updateCompanyField("philosophy", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-brand-blue h-32"
              />
            </div>
          </div>
        </div>

        {/* Contact/Map Settings */}
        <div className="space-y-8">
          <h2 className="text-lg font-heading text-white border-b border-white/5 pb-4">Communication & Location</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Public Contact Email</label>
              <input 
                value={data.contact.email} 
                onChange={(e) => updateContactField("email", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Proprietor Name</label>
              <input 
                value={data.company.proprietor} 
                onChange={(e) => updateCompanyField("proprietor", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-brand-blue"
              />
            </div>
             <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Google Maps Embed URL</label>
              <div className="relative">
                <input 
                  value={data.maps.iframeUrl} 
                  onChange={(e) => setData({ ...data, maps: { ...data.maps, iframeUrl: e.target.value } })}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-brand-blue pr-12"
                />
                <Map className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
