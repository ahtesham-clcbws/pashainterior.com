"use client";

import { motion } from "framer-motion";

const clients = [
  "Raine & Horne", "RE/MAX", "Century 21", "Coldwell Banker", "Sotheby's", 
  "Knight Frank", "Savills", "Colliers", "CBRE", "JLL"
];

export function ClientMarque() {
  return (
    <div className="py-12 bg-luxury-black/50 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Trusted by Industry Leaders</span>
      </div>
      <div className="relative flex">
        <motion.div 
          className="flex whitespace-nowrap gap-12 md:gap-24"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...clients, ...clients].map((client, index) => (
            <div 
              key={index} 
              className="text-2xl md:text-4xl font-heading font-black text-white/10 hover:text-brand-blue/30 transition-colors cursor-default select-none uppercase italic tracking-tighter"
            >
              {client}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
