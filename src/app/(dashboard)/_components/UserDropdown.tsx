"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { User, Settings, LogOut, Home } from "lucide-react";

import { logout } from "@/services/logout";
import { ApiResponse } from "../types/dashboard.types";

interface Props {
  user: ApiResponse;
}

export default function UserDropdown({ user }: Props) {
  const router = useRouter();

  const role = user.data?.role ?? "CUSTOMER";

  const profilePath =
    role === "ADMIN"
      ? null
      : role === "TECHNICIAN"
        ? "/technician-dashboard/profile"
        : "/dashboard/profile";

  const settingsPath =
    role === "ADMIN"
      ? "/admin-dashboard/settings"
      : role === "TECHNICIAN"
        ? null
        : "/dashboard/settings";

  const initials = user.data?.name
    ? user.data.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const handleLogout = async () => {
    try {
      toast.loading("Logging out...", {
        id: "logout",
      });

      await logout();

      toast.success("Logged out successfully!", {
        id: "logout",
      });

      router.replace("/login");
    } catch {
      toast.error("Logout failed", {
        id: "logout",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt={user.data?.name ?? "User"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="space-y-1">
            <p className="font-medium">{user.data?.name}</p>
            <p className="text-xs text-muted-foreground">{user.data?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </DropdownMenuItem>

        {profilePath && (
          <DropdownMenuItem asChild>
            <Link href={profilePath}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
        )}

        {settingsPath && (
          <DropdownMenuItem asChild>
            <Link href={settingsPath}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
