"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  containerClassName?: string;
  variant?: "dark" | "light";
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, className, containerClassName, variant = "dark", ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "section-padding",
          variant === "light" && "light-section",
          className
        )}
        {...props}
      >
        <div className={cn("max-w-7xl mx-auto", containerClassName)}>
          {children}
        </div>
      </motion.section>
    );
  }
);

Section.displayName = "Section";
