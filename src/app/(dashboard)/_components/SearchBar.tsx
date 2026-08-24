"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="hidden md:flex items-center gap-4 flex-1 max-w-md">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search bookings, technicians, services..."
          className="pl-10 bg-muted/50 border-none focus-visible:ring-1"
        />
      </div>

      <Button variant="outline" size="icon">
        <span className="text-xs font-mono">⌘F</span>
      </Button>
    </div>
  );
}