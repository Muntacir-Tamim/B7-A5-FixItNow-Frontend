



"use client";

import {
  Search,
  MapPin,
  Wrench,
  UserPlus,
  Bolt,
  Hammer,
  Home,
  Paintbrush,
  Sofa,
  Fan,
  Droplet,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PopularIndustries() {
  return (
<>
      {/* Popular Industries */}
      <div className="z-10 w-full mt-auto pb-12 pt-8 lg:pt-16">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase text-xs tracking-[2px] text-muted-foreground mb-6 font-medium text-center lg:text-left">
            POPULAR INDUSTRIES
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-6 md:gap-8">
            {[
              { icon: Hammer, label: "Flooring" },
              { icon: Home, label: "Roofing" },
              { icon: Paintbrush, label: "Windows" },
              { icon: Sofa, label: "Carpet" },
              { icon: Fan, label: "AC Repair" },
              { icon: Droplet, label: "Cleaning" },
              { icon: Wrench, label: "Handyman" },
              { icon: Droplet, label: "Plumbing" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10 group-hover:scale-110">
                  <item.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
  );
}