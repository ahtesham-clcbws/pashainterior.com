"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getGlobalData } from "@/lib/data";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner"; // Assuming toast is used or console.log for now

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { contact, maps } = getGlobalData();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");

      // In a real app, use a toast
      alert("Thank you for your message. We will contact you shortly.");
      reset();
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <main className="min-h-screen bg-luxury-black">
      <Header />
      
      <Section containerClassName="pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <span className="text-brand-blue text-xs font-medium tracking-[0.4em] uppercase mb-4 block">Get In Touch</span>
              <h1 className="text-5xl md:text-7xl font-heading text-white mb-8">Begin your <br /><span className="italic font-light text-foreground/40">transformation.</span></h1>
              <p className="text-foreground/50 text-lg leading-relaxed max-w-md">
                Whether you have a specific project in mind or simply wish to explore possibilities, we invite you to reach out.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: MapPin, label: "Location", value: `${contact.address.street}, ${contact.address.city}, ${contact.address.state} ${contact.address.postalCode}` },
                { icon: Phone, label: "Phone", value: contact.phone },
                { icon: Mail, label: "Email", value: contact.email },
                { icon: Clock, label: "Hours", value: "Mon - Sat: 10:00 AM - 07:00 PM" },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-brand-blue shrink-0">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card className="p-8 md:p-12" variant="glass">
            <h3 className="text-2xl font-heading text-white mb-10">Private Inquiry</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <input
                  {...register("name")}
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-4 text-white text-sm outline-none focus:border-brand-blue transition-colors"
                />
                {errors.name && <p className="text-destructive text-xs italic">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <input
                  {...register("email")}
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-4 text-white text-sm outline-none focus:border-brand-blue transition-colors"
                />
                {errors.email && <p className="text-destructive text-xs italic">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <input
                  {...register("phone")}
                  placeholder="Phone Number (Optional)"
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-4 text-white text-sm outline-none focus:border-brand-blue transition-colors"
                />
              </div>

              <div className="space-y-2">
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Describe your vision..."
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-4 text-white text-sm outline-none focus:border-brand-blue transition-colors resize-none"
                />
                {errors.message && <p className="text-destructive text-xs italic">{errors.message.message}</p>}
              </div>

              <Button type="submit" variant="brand" className="w-full py-7 text-sm font-bold uppercase tracking-widest" isLoading={isSubmitting}>
                Send Inqury
              </Button>
            </form>
          </Card>
        </div>
      </Section>

      {/* Map Section */}
      <section className="h-125 w-full mt-20 grayscale hover:grayscale-0 transition-all duration-1000">
        <iframe
          src={maps.iframeUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <Footer />
    </main>
  );
}
