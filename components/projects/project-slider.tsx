import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectSliderProps {
  images: string[];
  className?: string;
  imageClassName?: string;
  autoplay?: boolean;
  interval?: number;
}

export function ProjectSlider({ 
  images, 
  className, 
  imageClassName,
  autoplay = true,
  interval = 5000 
}: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(handleNext, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, handleNext]);

  return (
    <div className={cn("relative w-full aspect-video md:aspect-2/1 overflow-hidden rounded-xl bg-luxury-gray group", className)}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slider image ${currentIndex + 1}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn("absolute inset-0 w-full h-full object-cover", imageClassName)}
        />
      </AnimatePresence>

      {/* Controls - Always visible on desktop hover, or adjust as needed. Keeping visible for user request. */}
      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
        <button
          onClick={handlePrev}
          className="bg-black/20 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-colors pointer-events-auto z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="bg-black/20 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-colors pointer-events-auto z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
