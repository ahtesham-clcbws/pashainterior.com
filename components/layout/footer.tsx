import Link from "next/link";
import { Instagram, Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import globalData from "@/data/global.json";

import { TestimonialSlider } from "@/components/testimonials/testimonial-slider";

export function Footer() {
  const { company, contact, social } = globalData;

  return (
    <>
      <TestimonialSlider />
      <footer className="bg-luxury-black border-t border-white/5 pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/">
              <img src="/logo.svg" alt="Pasha Interior" className="h-8 md:h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {company.description}
            </p>
            <div className="flex items-center space-x-4">
              <a href={social.instagram} className="text-foreground/60 hover:text-brand-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href={social.facebook} className="text-foreground/60 hover:text-brand-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href={social.linkedin} className="text-foreground/60 hover:text-brand-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={social.twitter} className="text-foreground/60 hover:text-brand-blue transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-heading text-sm uppercase tracking-widest text-brand-blue">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-foreground/60 hover:text-foreground transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground/60 hover:text-foreground transition-colors text-sm">Our Services</Link>
              </li>
              <li>
                <Link href="/projects" className="text-foreground/60 hover:text-foreground transition-colors text-sm">Portfolio</Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/60 hover:text-foreground transition-colors text-sm">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services Link List */}
          <div className="space-y-6">
            <h4 className="font-heading text-sm uppercase tracking-widest text-brand-blue">Services</h4>
            <ul className="space-y-4 text-sm text-foreground/60">
              <li>Residential Interior</li>
              <li>Commercial Spaces</li>
              <li>Hospitality Design</li>
              <li>Furniture Customization</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-heading text-sm uppercase tracking-widest text-brand-blue">Connect</h4>
            <ul className="space-y-4 text-sm text-foreground/60">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-brand-blue shrink-0 mt-0.5" />
                <span>{contact.address.street}, {contact.address.city}, {contact.address.state}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-blue shrink-0" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-brand-blue shrink-0" />
                <span>{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-muted-foreground uppercase tracking-widest">
          <div className="space-y-2 text-center md:text-left">
            <p>© {new Date().getFullYear()} Pasha Interior. All Rights Reserved.</p>
            <p className="text-[10px] text-white/20 normal-case tracking-normal hover:text-brand-blue transition-colors">
              Design & Developed by{" "}
              <a 
                href="https://clcbws.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Broadway Web Services
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
