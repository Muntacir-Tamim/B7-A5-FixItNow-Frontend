import { getServiceById } from "@/app/(dashboard)/_actions/getServiceById";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Tag,
  MapPin,
  Star,
  BookOpen,
  PlusCircle,
} from "lucide-react";

type Props = {
  params: Promise<{ serviceId: string }>;
};

export default async function ServiceDetailsPage({ params }: Props) {
  const { serviceId } = await params;
  const service = await getServiceById(serviceId);

  if (!service) return notFound();

  const avgRating =
    service.reviews.length > 0
      ? (
          service.reviews.reduce((sum, r) => sum + r.rating, 0) /
          service.reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <Link
        href="/technician-dashboard/services"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Services
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{service.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {service.category.name}
          </p>
        </div>
        <Badge variant={service.status === "ACTIVE" ? "default" : "secondary"}>
          {service.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="text-muted-foreground">{service.description}</p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4 text-primary" />
              <span className="font-medium">${service.price}</span>
            </div>

            {service.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{service.location}</span>
              </div>
            )}

            {avgRating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>
                  {avgRating} ({service._count.reviews} reviews)
                </span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>{service._count.bookings} bookings</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href={`/technician-dashboard/services/${serviceId}/edit`}>
            Edit Service
          </Link>
        </Button>

        <Button asChild>
          <Link href={`/technician-dashboard/services/${serviceId}/slots`}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Manage Availability Slots
          </Link>
        </Button>
      </div>
    </div>
  );
}
