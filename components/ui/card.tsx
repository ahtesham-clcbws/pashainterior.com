import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outline";
  hover?: boolean;
}

export function Card({ className, variant = "default", hover = true, ...props }: CardProps) {
  const variants = {
    default: "bg-luxury-gray border border-white/5",
    glass: "bg-luxury-gray/50 backdrop-blur-md border border-white/10",
    outline: "bg-transparent border border-white/10",
  };

  return (
    <div
      className={cn(
        "rounded-lg p-6 transition-all duration-500",
        variants[variant],
        hover && "hover:border-brand-blue/50 hover:shadow-[0_10px_40px_-15px_rgba(0,153,221,0.15)] hover:-translate-y-2",
        className
      )}
      {...props}
    />
  );
}
