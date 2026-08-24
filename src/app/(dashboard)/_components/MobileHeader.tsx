"use client";

import { Menu} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useState } from "react";

import SidebarContent from "./SidebarContent";
import NavbarActions from "./NavbarActions";
import { ApiResponse } from "../types/dashboard.types";
import SiteLogo from "@/components/common/SiteLogo";

interface Props {
  role: "customer" | "technician" | "admin";
  user: ApiResponse;
}

export default function MobileHeader({
  role,
  user,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 lg:hidden">
      <div className="flex items-center gap-3">
        <Sheet
          open={open}
          onOpenChange={setOpen}
        >
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
            >
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-72 p-0"
          >
            <SidebarContent
              role={role}
              onClose={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>

          {/* Logo */}
          <SiteLogo/>

      </div>

      <NavbarActions user={user} />
    </header>
  );
}