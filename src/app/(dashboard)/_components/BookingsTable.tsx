// BookingsTable.tsx
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
import { format } from "date-fns"; // optional but recommended (or use toLocaleString)
import { MoreHorizontal, Eye, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BookingSlot } from "../types/bookingSlotProps";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type Booking = {
  id: string;
  bookingDate: string;
  status: string;
  paymentStatus: string;
  note: string | null;
  customer: Customer;
  customerId: string;
  serviceId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;
  acceptedAt: string | null;
  cancelledAt: string | null;
  completedAt: string | null;
  cancelReason: string | null;
  bookingSlots: BookingSlot[];
};

interface BookingsTableProps {
  data: Booking[];
}

const statusVariant = (status: string) => {
  switch (status) {
    case "REQUESTED":
      return "secondary";
    case "ACCEPTED":
      return "default";
    case "COMPLETED":
      return "default"; // or "success" if you have it
    case "CANCELLED":
      return "destructive";
    default:
      return "outline";
  }
};

const paymentVariant = (status: string) => {
  switch (status) {
    case "PENDING":
      return "secondary";
    case "PAID":
      return "default";
    case "FAILED":
      return "destructive";
    default:
      return "outline";
  }
};

export function BookingsTable({ data }: BookingsTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center text-muted-foreground">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Customer</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <div className="space-y-1">
                  <p className="font-medium leading-none">
                    {booking.customer?.name || "—"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {booking.customer?.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {booking.customer?.phone}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                {booking.bookingDate
                  ? format(new Date(booking.bookingDate), "MMM dd, yyyy HH:mm")
                  : "—"}
              </TableCell>

              <TableCell>
                <Badge variant={statusVariant(booking.status)}>
                  {booking.status}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge variant={paymentVariant(booking.paymentStatus)}>
                  {booking.paymentStatus}
                </Badge>
              </TableCell>

              <TableCell className="max-w-[200px] truncate">
                {booking.note || "—"}
              </TableCell>

              <TableCell>
                {booking.createdAt
                  ? format(new Date(booking.createdAt), "MMM dd, yyyy")
                  : "—"}
              </TableCell>

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
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accept
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}