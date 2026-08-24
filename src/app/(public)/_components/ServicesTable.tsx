"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Star,
  MapPin,
} from "lucide-react";

type Category = {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
};

type TechnicianProfile = {
  id: string;
  bio?: string | null;
  profilePhoto?: string | null;
  user?: {
    name: string;
  } | null;
};

type Review = {
  rating: number;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  location?: string | null;
  status: "ACTIVE" | "INACTIVE";
  category?: Category | null;
  categoryId: string;
  technicianProfile?: TechnicianProfile | null;
  technicianProfileId: string;
  reviews?: Review[];
  _count?: {
    reviews?: number;
    bookings?: number;
  };
  createdAt: string;
  updatedAt: string;
};

interface ServicesTableProps {
  data: Service[];
}

export function ServicesTable({ data }: ServicesTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center text-muted-foreground">
        No services found.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((service) => {
            const reviews = service.reviews ?? [];
            const totalReviews = service._count?.reviews ?? reviews.length;
            const averageRating = reviews.length
              ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
              : 0;

            return (
              <TableRow key={service.id}>
                {/* Title + Description */}
                <TableCell>
                  <div className="space-y-1 max-w-[220px]">
                    <p className="font-medium leading-none truncate">
                      {service.title}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {service.description}
                    </p>
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell>
                  <Badge variant="outline">
                    {service.category?.name ?? "—"}
                  </Badge>
                </TableCell>

                {/* Technician */}
                <TableCell className="text-sm">
                  {service.technicianProfile?.user?.name ?? "—"}
                </TableCell>

                {/* Price */}
                <TableCell>
                  <div className="font-medium">৳{service.price}</div>
                </TableCell>

                {/* Location */}
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    {service.location ? (
                      <>
                        <MapPin className="h-3.5 w-3.5" />
                        {service.location}
                      </>
                    ) : (
                      "—"
                    )}
                  </div>
                </TableCell>

                {/* Rating */}
                <TableCell>
                  {totalReviews > 0 ? (
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {averageRating.toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({totalReviews})
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      No ratings
                    </span>
                  )}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    variant={
                      service.status === "ACTIVE" ? "default" : "secondary"
                    }
                  >
                    {service.status === "ACTIVE" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>

                {/* Updated At */}
                <TableCell className="text-sm text-muted-foreground">
                  {service.updatedAt
                    ? format(new Date(service.updatedAt), "MMM dd, yyyy")
                    : "—"}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
