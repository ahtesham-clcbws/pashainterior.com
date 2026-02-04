"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_PANEL_URL || "/studio";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push(adminUrl);
        router.refresh();
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-luxury-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 border-white/5 bg-luxury-gray/50 backdrop-blur-xl">
          <div className="text-center mb-10">
            <img src="/logo.svg" alt="Pasha Interior" className="h-10 mx-auto mb-6" />
            <h1 className="text-2xl font-heading text-white">Studio Authentication</h1>
            <p className="text-foreground/40 text-xs uppercase tracking-widest mt-2">Authorized Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-4 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Email Identifier</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-4 text-white text-sm outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Access Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-4 text-white text-sm outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            <Button variant="brand" className="w-full py-7 uppercase tracking-widest font-bold text-xs" isLoading={isLoading}>
              Unlock Studio
            </Button>
          </form>
          
          <p className="text-center mt-8 text-[10px] text-foreground/20 uppercase tracking-[0.3em]">
            Precision & Aesthetics
          </p>
        </Card>
      </motion.div>
    </main>
  );
}
