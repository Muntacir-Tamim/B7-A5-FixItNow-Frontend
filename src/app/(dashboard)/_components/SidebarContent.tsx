"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleHelp, LogOut, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { navigation } from "../_config/dashboard-navigation";
import SiteLogo from "@/components/common/SiteLogo";
import { logout } from "@/services/logout";
import { toast } from "sonner";

interface SidebarContentProps {
  role: "customer" | "technician" | "admin";
  onClose?: () => void;
}

export default function SidebarContent({ role, onClose }: SidebarContentProps) {
  const pathname = usePathname();

  const navItems = navigation[role];

  const settingsPath =
    role === "admin"
      ? "/admin-dashboard/settings"
      : role === "customer"
        ? "/dashboard/settings"
        : null;

  const helpPath =
    role === "admin"
      ? null
      : role === "technician"
        ? null
        : "/dashboard/help-support";

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful.");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="flex h-full flex-col w-full">
      <div className="flex items-center gap-3 border-b px-4 py-4">
        <SiteLogo />
      </div>

      <ScrollArea className="flex-1 px-3 py-6">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-6" />

        {settingsPath && (
          <Link
            href={settingsPath}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
              pathname === settingsPath
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        )}

        {helpPath && (
          <Link
            href={helpPath}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
              pathname === helpPath
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <CircleHelp className="h-5 w-5" />
            Help / Support
          </Link>
        )}
      </ScrollArea>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
