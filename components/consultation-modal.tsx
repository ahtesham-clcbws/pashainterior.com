"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight } from "lucide-react";
import { useConsultation } from "@/components/consultation-context";
import { Button } from "@/components/ui/button";

export function ConsultationModal() {
  const { isOpen, closeModal } = useConsultation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Residential",
    budgetRange: "₹50L - ₹1Cr",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          closeModal();
          setTimeout(() => {
            setIsSuccess(false);
            setStep(1);
            setFormData({
              name: "",
              email: "",
              phone: "",
              projectType: "Residential",
              budgetRange: "₹50L - ₹1Cr",
              description: ""
            });
          }, 500);
        }, 3000);
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-luxury-black/90 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-luxury-gray border border-white/5 rounded-2xl shadow-2xl overflow-hidden"
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12">
              {isSuccess ? (
                <div className="text-center py-12">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-20 h-20 bg-brand-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue"
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                  <h3 className="text-3xl font-heading text-white mb-4">Request Received</h3>
                  <p className="text-white/60">
                    Thank you, {formData.name}. Our design team will review your project details and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <span className="text-brand-blue text-xs font-semibold tracking-[0.3em] uppercase block mb-3">Private Consultation</span>
                    <h2 className="text-3xl md:text-4xl font-heading text-white leading-tight">
                      Let's Discuss <br /> Your Vision.
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-white/40">Full Name</label>
                       <input 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-blue outline-none transition-colors"
                        placeholder="John Doe"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-white/40">Email Address</label>
                       <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-blue outline-none transition-colors"
                        placeholder="john@example.com"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-white/40">Phone</label>
                       <input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-blue outline-none transition-colors"
                        placeholder="+91..."
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-white/40">Project Type</label>
                       <select 
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-blue outline-none transition-colors appearance-none"
                       >
                         <option className="bg-luxury-gray">Residential</option>
                         <option className="bg-luxury-gray">Commercial</option>
                         <option className="bg-luxury-gray">Hospitality</option>
                         <option className="bg-luxury-gray">Renovation</option>
                       </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-white/40">Estimated Budget</label>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                       {["₹20L - ₹50L", "₹50L - ₹1Cr", "₹1Cr - ₹5Cr", "₹5Cr+"].map((tier) => (
                         <button
                          key={tier}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetRange: tier })}
                          className={`px-3 py-2 rounded-md text-xs font-medium border transition-all ${
                            formData.budgetRange === tier 
                              ? "border-brand-blue bg-brand-blue/10 text-brand-blue" 
                              : "border-white/10 text-white/60 hover:border-white/20"
                          }`}
                         >
                           {tier}
                         </button>
                       ))}
                     </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Project Details</label>
                    <textarea 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-blue outline-none transition-colors resize-none"
                      placeholder="Share a brief about your requirements, timeline, or specific ideas..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="brand" 
                    size="lg" 
                    className="w-full"
                    isLoading={isSubmitting}
                  >
                    Submit Request <ArrowRight size={18} className="ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
