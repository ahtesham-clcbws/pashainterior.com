"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col h-full space-y-6" variant="glass">
      <div className="flex justify-between items-start">
        <div className="flex space-x-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={14} className="fill-brand-blue text-brand-blue" />
          ))}
        </div>
        <Quote size={40} className="text-white/5" />
      </div>
      
      <p className="text-white/80 italic leading-relaxed flex-grow">
        "{testimonial.text}"
      </p>
      
      <div className="pt-6 border-t border-white/5">
        <h4 className="font-heading text-white">{testimonial.name}</h4>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
          {testimonial.role}, {testimonial.company}
        </p>
      </div>
    </Card>
  );
}
