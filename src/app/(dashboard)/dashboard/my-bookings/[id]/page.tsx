import { getBookingById } from "@/app/(dashboard)/_actions/getBookingById";

import Link from "next/link";
import Image from "next/image";

import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  User,
  Wrench,
  CreditCard,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  bookingStatusConfig,
  paymentStatusConfig,
} from "../config/bookingStatusConfig";

export default async function SingleBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getBookingById(id);
  const booking = result?.data;

  if (!booking) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p>Booking not found.</p>
      </div>
    );
  }

  const technicianUser = booking.technicianProfile?.user;
  const technicianBio = booking.technicianProfile?.bio;
  const technicianPhoto = booking.technicianProfile?.profilePhoto;

  const paymentStatusKey = (booking.payment?.status ??
    "PENDING") as keyof typeof paymentStatusConfig;
  const bookingStatusKey = booking.status as keyof typeof bookingStatusConfig;

  const canCancel = !["IN_PROGRESS", "COMPLETED", "CANCELLED"].includes(
    booking.status,
  );
  const canPay =
    booking.status === "ACCEPTED" && booking.payment?.status !== "COMPLETED";

  return (
    <div className="container mx-auto max-w-6xl space-y-6 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link href="/dashboard/my-bookings">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bookings
          </Button>
        </Link>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={bookingStatusConfig[bookingStatusKey]?.className}
          >
            {bookingStatusConfig[bookingStatusKey]?.label ?? booking.status}
          </Badge>

          <Badge
            variant="outline"
            className={paymentStatusConfig[paymentStatusKey]?.className}
          >
            {paymentStatusConfig[paymentStatusKey]?.label ?? paymentStatusKey}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Service Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Service Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {booking.service?.thumbnail && (
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={booking.service.thumbnail}
                  alt={booking.service.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold">{booking.service?.title}</h3>
              <p className="mt-1 text-muted-foreground">
                {booking.service?.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {new Date(booking.scheduledDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{booking.scheduledTime}</span>
            </div>

            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-lg">
                ${booking.totalAmount}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technician</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {technicianPhoto && (
              <Image
                src={technicianPhoto}
                alt="Technician"
                width={90}
                height={90}
                className="rounded-full object-cover"
              />
            )}

            <div>
              <h3 className="text-lg font-semibold">
                {technicianUser?.name ?? "Assigned Technician"}
              </h3>

              {technicianBio && (
                <p className="text-muted-foreground">{technicianBio}</p>
              )}

              {technicianUser?.phone && (
                <p className="text-muted-foreground">
                  Mobile: {technicianUser.phone}
                </p>
              )}

              {technicianUser?.email && (
                <p className="text-muted-foreground">
                  Email: {technicianUser.email}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Customer Note
          </CardTitle>
        </CardHeader>

        <CardContent>
          {booking.note ? (
            <p>{booking.note}</p>
          ) : (
            <p className="text-muted-foreground">
              No additional note provided.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p>{booking.customer?.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p>{booking.customer?.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p>{booking.customer?.phone ?? "—"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Booking ID</p>
            <p className="break-all text-xs">{booking.id}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p>{booking.address}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        {canPay && (
          <Button asChild>
            <Link href={`/dashboard/my-bookings/${booking.id}/payment`}>
              Pay Now
            </Link>
          </Button>
        )}

        {booking.status === "COMPLETED" && !booking.review && (
          <Button asChild variant="outline">
            <Link href={`/dashboard/my-bookings/${booking.id}/leave-review`}>
              Leave a Review
            </Link>
          </Button>
        )}

        {canCancel && (
          <Button variant="destructive" asChild>
            <Link href={`/dashboard/my-bookings/${booking.id}/cancel`}>
              Cancel Booking
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
