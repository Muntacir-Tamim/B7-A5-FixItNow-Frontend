"use client";

import { Bell, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";
import { ApiResponse } from "../types/dashboard.types";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  user: ApiResponse;

  unreadMessages?: number;
  unreadNotifications?: number;
}

export default function NavbarActions({
  user,
  unreadMessages = 0,
  unreadNotifications = 0,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <ThemeSwitcher />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Mail className="h-5 w-5" />
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                {unreadMessages > 9 ? "9+" : unreadMessages}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-72 p-4">
          <p className="text-sm font-medium mb-1">Messages</p>
          <p className="text-xs text-muted-foreground">
            {unreadMessages > 0
              ? `You have ${unreadMessages} unread message${unreadMessages > 1 ? "s" : ""}.`
              : "No new messages."}
          </p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-72 p-4">
          <p className="text-sm font-medium mb-1">Notifications</p>
          <p className="text-xs text-muted-foreground">
            {unreadNotifications > 0
              ? `You have ${unreadNotifications} new notification${unreadNotifications > 1 ? "s" : ""}.`
              : "No new notifications."}
          </p>
        </PopoverContent>
      </Popover>

      <UserDropdown user={user} />
    </div>
  );
}
