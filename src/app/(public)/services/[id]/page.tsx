import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Tag } from "lucide-react";
import BookingModal from "../_components/BookingModal";

const SingleServiceByIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`,
    {
      cache: "no-store",
    },
  );

  const { data } = await res.json();

  if (!data) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-2xl font-bold">Service Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The service you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  // Backend Service model uses "status" field (ACTIVE/INACTIVE), not "isAvailable"
  const isActive = data.status === "ACTIVE";

  // averageRating comes from _count or reviews, use optional chaining safely
  const avgRating = data.averageRating ?? null;
  const totalReviews = data._count?.reviews ?? data.reviews?.length ?? 0;

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-8 lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative flex h-[420px] w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              {data.thumbnail ? (
                <Image
                  src={data.thumbnail}
                  alt={data.title ?? "Service"}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <Tag className="h-16 w-16 text-primary/40" />
                  <span className="text-lg font-medium">
                    {data.category?.name}
                  </span>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge>{data.category?.name}</Badge>

                {isActive ? (
                  <Badge className="bg-green-600 hover:bg-green-600">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="destructive">Unavailable</Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold">{data.title}</h1>

              <div className="flex flex-wrap gap-6 text-muted-foreground">
                {avgRating !== null && (
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span>
                      {Number(avgRating).toFixed(1)} ({totalReviews} Reviews)
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold">Description</h2>

                <p className="leading-7 text-muted-foreground">
                  {data.description}
                </p>
              </div>

              {/* Technician info */}
              {data.technicianProfile?.user?.name && (
                <div>
                  <h2 className="mb-3 text-xl font-semibold">Technician</h2>
                  <p className="text-muted-foreground">
                    {data.technicianProfile.user.name}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-5 p-6">
              <h2 className="text-2xl font-bold">Book This Service</h2>

              <p className="text-sm text-muted-foreground">
                Choose your preferred date and time when booking — click{" "}
                <span className="font-medium">Book This Service</span> on the
                right to get started.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="space-y-6 p-6">
              <div>
                <p className="text-muted-foreground">Service Price</p>

                <h2 className="text-4xl font-bold text-primary">
                  ৳{data.price}
                </h2>

                <p className="text-muted-foreground">Fixed Price</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Category</span>

                  <span className="font-medium">{data.category?.name}</span>
                </div>

                {avgRating !== null && (
                  <div className="flex justify-between">
                    <span>Rating</span>
                    <span>{Number(avgRating).toFixed(1)}/5</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Status</span>

                  <span
                    className={isActive ? "text-green-600" : "text-red-600"}
                  >
                    {isActive ? "Available" : "Unavailable"}
                  </span>
                </div>

                {data.location && (
                  <div className="flex justify-between">
                    <span>Location</span>
                    <span className="font-medium">{data.location}</span>
                  </div>
                )}
              </div>

              <BookingModal
                serviceId={data.id}
                isAvailable={isActive}
                availability={data.technicianProfile?.availability ?? []}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleServiceByIdPage;
