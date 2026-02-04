"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  BarChart3, 
  MessageSquare, 
  Layers, 
  Briefcase, 
  UserCircle, 
  Settings, 
  LogOut,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  user: { email: string, role: string } | null;
}

export function AdminSidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const menuItems = [
    { name: "Inquiries", href: "/studio", icon: MessageSquare, roles: ["developer", "admin"] },
    { name: "Consultations", href: "/studio/consultations", icon: Layers, roles: ["developer", "admin"] },
    { name: "Services", href: "/studio/services", icon: Layers, roles: ["developer"] },
    { name: "Portfolio", href: "/studio/projects", icon: Briefcase, roles: ["developer"] },
    { name: "Testimonials", href: "/studio/testimonials", icon: UserCircle, roles: ["developer"] },
    { name: "Settings", href: "/studio/settings", icon: Settings, roles: ["developer"] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role || ""));

  return (
    <div className="w-64 h-full bg-luxury-gray border-r border-white/5 flex flex-col pt-8">
      <div className="px-6 mb-12">
        <Link href="/">
          <img src="/logo.svg" alt="Pasha Interior" className="h-6" />
        </Link>
        <div className="mt-8 p-3 rounded-lg bg-white/5 border border-white/5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Authenticated Position</p>
          <p className="text-white text-xs font-semibold capitalize">{user?.role} Studio</p>
        </div>
      </div>

      <nav className="grow px-4 space-y-2">
        {filteredMenu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-300",
              pathname === item.href 
                ? "bg-brand-blue/10 text-brand-blue border-l-2 border-brand-blue" 
                : "text-foreground/60 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon size={18} />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        <Link href="/" target="_blank" className="flex items-center space-x-3 px-4 py-3 text-foreground/40 hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold">
          <ExternalLink size={14} />
          <span>Launch Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-destructive/60 hover:text-destructive hover:bg-destructive/5 rounded-md transition-all text-xs uppercase tracking-widest font-bold"
        >
          <LogOut size={16} />
          <span>Terminate Session</span>
        </button>
      </div>
    </div>
  );
}
