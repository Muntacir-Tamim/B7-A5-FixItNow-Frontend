import Link from "next/link";

import { getBookingsByTechnician } from "../../_actions/getAllBookingsByTechnician";
import { getMe } from "@/services/getMe";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import { CalendarDays, Clock3, Eye, User } from "lucide-react";
import UpdateBookingStatusByTechnician from "../../_components/updateBookingStatusByTechnician";

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Booking {
  id: string;
  customerId: string;
  technicianProfileId: string;
  serviceId: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  note: string | null;
  status: BookingStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  service?: {
    id: string;
    title: string;
    price: number;
  };
  payment?: {
    status: string;
  } | null;
}

export default async function TechnicianBookingsPage() {
  // Check whether the technician has completed their profile first.
  // Without a profile, the bookings endpoint has nothing to look up
  // and will fail for a brand-new technician.
  const meResult = await getMe();
  const technicianProfileId: string | undefined =
    meResult?.data?.technicianProfile?.id;

  const response = technicianProfileId
    ? await getBookingsByTechnician()
    : { success: false, data: [] };

  const bookings: Booking[] = response?.data || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">Manage all customer bookings.</p>
      </div>

      {/* Prompt to complete profile if it doesn't exist yet */}
      {!technicianProfileId && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row md:text-left">
            <div>
              <p className="font-medium">Complete your technician profile</p>
              <p className="text-sm text-muted-foreground">
                You need to set up your profile before customer bookings can
                appear here.
              </p>
            </div>

            <Button asChild>
              <Link href="/technician-dashboard/profile">Complete Profile</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{bookings.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">
              {bookings.filter((b) => b.status === "REQUESTED").length}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Accepted</p>
            <p className="text-2xl font-bold">
              {bookings.filter((b) => b.status === "ACCEPTED").length}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold">
              {bookings.filter((b) => b.status === "COMPLETED").length}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>All customer booking requests.</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{booking.customer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {booking.customer.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-sm">
                        {booking.service?.title ?? "—"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        {new Date(booking.scheduledDate).toLocaleDateString()}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock3 className="h-4 w-4" />
                        {booking.scheduledTime}
                      </div>
                    </TableCell>

                    <TableCell>
                      <UpdateBookingStatusByTechnician
                        bookingId={booking.id}
                        currentStatus={booking.status}
                      />
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">
                        {booking.payment?.status ?? "PENDING"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="icon">
                        <Link
                          href={`/technician-dashboard/bookings/${booking.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
