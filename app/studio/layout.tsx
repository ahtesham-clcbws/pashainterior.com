"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ email: string, role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        
        if (data.authenticated) {
          setUser(data.user);
        } else {
          // Middleware should handle this, but as a backup
          router.push("/studio/login");
        }
      } catch (err) {
        console.error("Session check failed", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router, pathname]);

  const isLoginPage = pathname === "/studio/login";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="flex h-screen bg-luxury-black text-white">
      <AdminSidebar user={user} />
      <main className="grow overflow-auto p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
