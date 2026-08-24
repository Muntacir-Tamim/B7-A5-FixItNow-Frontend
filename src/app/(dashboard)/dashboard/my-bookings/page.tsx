import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getMyBookings } from "../../_actions/getMyBookings";
import { bookingStatusConfig, paymentStatusConfig } from "./config/bookingStatusConfig";

interface BookingItem {
  id: string;
  note: string;
  status: string;
  createdAt: string;
  customerId: string;
  payment?: {
    status: string;
  } | null;
  scheduledDate: string;
  totalAmount: number;
  service?: {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
    price: number;
  };
}

export default async function MyBookings() {
  const result = await getMyBookings();
  const bookings: BookingItem[] = result?.data || [];

  if (!bookings.length) {
    return (
      <div className="container mx-auto py-16">
        <Card className="mx-auto max-w-xl">
          <CardContent className="space-y-4 py-12 text-center">
            <h2 className="text-2xl font-bold">No Bookings Found</h2>
            <p className="text-muted-foreground">
              You haven't booked any services yet.
            </p>
            <Button asChild>
              <Link href="/services">Browse Services</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">My Bookings</CardTitle>
          <CardDescription>Manage all your booked services.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {bookings.map((booking: BookingItem) => {
                  const paymentStatus = booking.payment?.status ?? "PENDING";

                  return (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          {booking.service?.thumbnail ? (
                            <Image
                              src={booking.service.thumbnail}
                              alt={booking.service?.title ?? "Service"}
                              width={60}
                              height={60}
                              className="h-14 w-14 rounded-md object-cover"
                            />
                          ) : (
                            <div className="h-14 w-14 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                              N/A
                            </div>
                          )}
                          <div>
                            <p className="font-semibold">
                              {booking.service?.title || "Service"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        {new Date(booking.scheduledDate).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            bookingStatusConfig[
                              booking.status as keyof typeof bookingStatusConfig
                            ]?.className
                          }
                        >
                          {bookingStatusConfig[
                            booking.status as keyof typeof bookingStatusConfig
                          ]?.label ?? booking.status}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            paymentStatusConfig[
                              paymentStatus as keyof typeof paymentStatusConfig
                            ]?.className
                          }
                        >
                          {paymentStatusConfig[
                            paymentStatus as keyof typeof paymentStatusConfig
                          ]?.label ?? paymentStatus}
                        </Badge>
                      </TableCell>

                      <TableCell>${booking.totalAmount ?? 0}</TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {booking.status === "REQUESTED" && (
                            <Button size="sm" variant="secondary" disabled>
                              Waiting...
                            </Button>
                          )}

                          {booking.status === "ACCEPTED" &&
                            paymentStatus !== "COMPLETED" && (
                              <Button size="sm" asChild>
                                <Link
                                  href={`/dashboard/my-bookings/${booking.id}/payment`}
                                >
                                  Pay Now
                                </Link>
                              </Button>
                            )}

                          {booking.status === "ACCEPTED" &&
                            paymentStatus === "COMPLETED" && (
                              <Button size="sm" variant="secondary" disabled>
                                Payment Done
                              </Button>
                            )}

                          {booking.status === "DECLINED" && (
                            <Button size="sm" variant="destructive" disabled>
                              Declined
                            </Button>
                          )}

                          {booking.status === "PAID" && (
                            <Button size="sm" variant="secondary" disabled>
                              Waiting for Technician
                            </Button>
                          )}

                          {booking.status === "IN_PROGRESS" && (
                            <Button size="sm" variant="secondary" disabled>
                              In Progress
                            </Button>
                          )}

                          {booking.status === "COMPLETED" && (
                            <Button size="sm" asChild>
                              <Link
                                href={`/dashboard/my-bookings/${booking.id}/leave-review`}
                              >
                                Leave Review
                              </Link>
                            </Button>
                          )}

                          {booking.status === "CANCELLED" && (
                            <Button size="sm" variant="destructive" disabled>
                              Cancelled
                            </Button>
                          )}

                          <Button asChild size="sm" variant="outline">
                            <Link href={`/dashboard/my-bookings/${booking.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
