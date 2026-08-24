import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, User } from "lucide-react";
import { IService } from "@/types/types.service";

interface ServiceCardProps {
  service: IService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Backend Service model fields: title, description, price, status, category, technicianProfile
  // averageRating, totalReviews, thumbnail, priceType, estimatedDuration do NOT exist in backend
  const isActive = service.status === "ACTIVE";

  return (
    <Card className="group overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Colored header strip instead of thumbnail (backend has no thumbnail) */}
      <div className="relative flex h-32 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="rounded-full bg-primary/10 p-4">
          <User className="h-10 w-10 text-primary" />
        </div>

        <Badge
          className="absolute left-3 top-3"
          variant={isActive ? "default" : "secondary"}
        >
          {isActive ? "Available" : "Unavailable"}
        </Badge>

        {service.category?.name && (
          <Badge className="absolute right-3 top-3" variant="outline">
            {service.category.name}
          </Badge>
        )}
      </div>

      <CardContent className="space-y-3 p-5">
        {/* Technician */}
        {service.technicianProfile?.user?.name && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{service.technicianProfile.user.name}</span>
          </div>
        )}

        {/* Location */}
        {service.location && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{service.location}</span>
          </div>
        )}

        {/* Rating placeholder — shown only if backend returns it */}
        {service.averageRating != null && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">
              {Number(service.averageRating).toFixed(1)}
            </span>
            {service.totalReviews != null && (
              <span className="text-sm text-muted-foreground">
                ({service.totalReviews} reviews)
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="line-clamp-1 text-xl font-semibold">{service.title}</h3>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {service.description}
        </p>

        {/* Price & Button */}
        <div className="flex items-end justify-between pt-2">
          <div>
            <h4 className="text-2xl font-bold">${service.price}</h4>
            <p className="text-xs text-muted-foreground">Fixed Price</p>
          </div>

          <Button asChild disabled={!isActive}>
            <Link href={`/services/${service.id}`}>
              {isActive ? "Book Now" : "Unavailable"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
