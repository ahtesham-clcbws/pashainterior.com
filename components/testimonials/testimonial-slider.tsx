"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { getTestimonials } from "@/lib/data";
import { Testimonial } from "@/types";

export function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setTestimonials(getTestimonials());
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      next();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, testimonials]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const t = testimonials[currentIndex];

  return (
    <div className="bg-luxury-gray/30 border-y border-white/5 py-24 px-6 overflow-hidden relative">
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute -top-12 -left-8 text-brand-blue/10">
          <Quote size={120} />
        </div>
        
        <div className="text-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < t.rating ? "text-brand-blue fill-brand-blue" : "text-white/10"} 
                  />
                ))}
              </div>

              <p className="text-2xl md:text-3xl font-light text-white leading-relaxed italic">
                "{t.text}"
              </p>

              <div>
                <h4 className="text-xl font-heading text-white mb-1">{t.name}</h4>
                <p className="text-brand-blue text-xs uppercase tracking-[0.3em] font-medium">
                  {t.role} — {t.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center space-x-12 mt-16">
          <button 
            onClick={prev}
            className="text-white/20 hover:text-brand-blue transition-colors outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </button>
          
          <div className="flex space-x-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? "w-8 bg-brand-blue" : "w-2 bg-white/10"}`}
              />
            ))}
          </div>

          <button 
            onClick={next}
            className="text-white/20 hover:text-brand-blue transition-colors outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>
        </div>
      </div>
    </div>
  );
}
