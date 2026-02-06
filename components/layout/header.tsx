"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useConsultation } from "@/components/consultation-context";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { openModal } = useConsultation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        isScrolled ? "py-4 bg-luxury-black/80 backdrop-blur-lg border-b border-white/5" : "py-8 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="relative z-50">
          <img src="/logo.png" alt="Pasha Interior" className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium tracking-widest uppercase transition-colors hover:text-brand-blue",
                pathname === item.href ? "text-brand-blue" : "text-foreground/70"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Button variant="brand" size="sm" className="hidden lg:flex" onClick={openModal}>
            Book Consultation
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 bg-luxury-black z-40 flex flex-col items-center justify-center space-y-8"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-2xl font-heading tracking-widest uppercase",
                      pathname === item.href ? "text-brand-blue" : "text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button variant="brand" size="lg" className="mt-8" asChild>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
