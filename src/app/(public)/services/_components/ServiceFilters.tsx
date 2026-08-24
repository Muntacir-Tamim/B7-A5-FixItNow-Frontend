"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  RotateCcw,
  SlidersHorizontal,
  Tags,
  MapPin,
  BadgeDollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IServiceCategory {
  id: string;
  name: string;
}

interface ServiceFilterProps {
  categories: IServiceCategory[];
}

// Supported backend query params for GET /api/services:
// searchTerm, categoryId, location, minPrice, maxPrice, sortBy, sortOrder, page, limit
export default function ServiceFilter({ categories }: ServiceFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getValue = (key: string) => searchParams.get(key) || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // reset to page 1 whenever filter changes
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => router.push(pathname);

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="border-b bg-muted/30 px-5 py-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <SlidersHorizontal className="h-4 w-4" />
          Filter Services
        </CardTitle>
      </CardHeader>

      <CardContent className="h-full p-5">
        <div className="flex h-full flex-col gap-5">
          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Tags className="h-4 w-4 text-muted-foreground" />
              Category
            </label>
            <Select
              value={getValue("categoryId") || "all"}
              onValueChange={(value) => updateFilter("categoryId", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label
              htmlFor="location"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Location
            </label>
            <Input
              id="location"
              defaultValue={getValue("location")}
              placeholder="e.g. Dhaka"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateFilter("location", e.currentTarget.value);
                }
              }}
            />
          </div>

          {/* Min Price */}
          <div className="space-y-2">
            <label
              htmlFor="minPrice"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
              Min Price (৳)
            </label>
            <Input
              id="minPrice"
              type="number"
              min={0}
              defaultValue={getValue("minPrice")}
              placeholder="e.g. 100"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateFilter("minPrice", e.currentTarget.value);
                }
              }}
            />
          </div>

          {/* Max Price */}
          <div className="space-y-2">
            <label
              htmlFor="maxPrice"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
              Max Price (৳)
            </label>
            <Input
              id="maxPrice"
              type="number"
              min={0}
              defaultValue={getValue("maxPrice")}
              placeholder="e.g. 2000"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateFilter("maxPrice", e.currentTarget.value);
                }
              }}
            />
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              Sort By
            </label>
            <Select
              value={getValue("sortOrder") || "desc"}
              onValueChange={(value) => updateFilter("sortOrder", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset */}
          <div className="mt-auto border-t pt-5">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={resetFilters}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
