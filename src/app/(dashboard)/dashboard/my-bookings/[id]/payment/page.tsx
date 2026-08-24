import { getBookingById } from "@/app/(dashboard)/_actions/getBookingById";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArrowLeft, Calendar, Clock, CreditCard, Wrench } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import StripeButton from "./StripeButton";
import SSLCommerzButton from "./SSLCommerzButton";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getBookingById(id);
  const booking = result?.data;

  if (!booking) {
    notFound();
  }

  const paymentStatus = booking.payment?.status ?? "PENDING";

  if (paymentStatus === "COMPLETED") {
    return (
      <div className="container mx-auto max-w-2xl py-12">
        <Card>
          <CardHeader>
            <CardTitle>Payment Completed</CardTitle>
            <CardDescription>
              This booking has already been paid.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={`/dashboard/my-bookings/${booking.id}`}>
              <Badge className="cursor-pointer px-4 py-2">
                Back to Booking
              </Badge>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (booking.status === "CANCELLED") {
    return (
      <div className="container mx-auto max-w-2xl py-12">
        <Card>
          <CardHeader>
            <CardTitle>Booking Cancelled</CardTitle>
            <CardDescription>
              Payment is unavailable because this booking has been cancelled.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={`/dashboard/my-bookings/${booking.id}`}>
              <Badge className="cursor-pointer px-4 py-2">
                Back to Booking
              </Badge>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-8">
      <div className="flex items-center justify-between">
        <Link href={`/dashboard/my-bookings/${booking.id}`}>
          <Badge className="cursor-pointer px-4 py-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Badge>
        </Link>
        <Badge variant="secondary">Payment Pending</Badge>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>
                Review your booking before making payment.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {booking.service?.thumbnail && (
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <Image
                    src={booking.service.thumbnail}
                    alt={booking.service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold">{booking.service?.title}</h2>
                <p className="mt-2 text-muted-foreground">
                  {booking.service?.description}
                </p>
              </div>

              <Separator />

              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Scheduled Date
                    </p>
                    <p className="font-medium">
                      {new Date(booking.scheduledDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Scheduled Time
                    </p>
                    <p className="font-medium">{booking.scheduledTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Technician</p>
                    <p className="font-medium">
                      {booking.technicianProfile?.user?.name ??
                        "Assigned Technician"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Payment Status
                    </p>
                    <Badge variant="outline">{paymentStatus}</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-2xl font-bold">
                <span>Total Amount</span>
                <span className="text-primary">${booking.totalAmount}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
              <CardDescription>
                Choose your preferred payment gateway.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <StripeButton
                bookingId={booking.id}
                amount={Number(booking.totalAmount)}
              />
              <SSLCommerzButton
                bookingId={booking.id}
                amount={Number(booking.totalAmount)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
