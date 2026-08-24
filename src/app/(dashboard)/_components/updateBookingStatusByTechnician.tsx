"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { updateBookingStatus } from "../_actions/updateBookingStatus";
import { Button } from "@/components/ui/button";
import { Check, X, PlayCircle, CheckCircle2 } from "lucide-react";

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

interface Props {
  bookingId: string;
  currentStatus: BookingStatus;
}

// Only these statuses can ever be *set* by a technician action.
// (PAID is set by the payment system, CANCELLED by the customer —
// neither should be selectable here.)
type TechnicianSettableStatus = "ACCEPTED" | "DECLINED" | "IN_PROGRESS" | "COMPLETED";

export default function UpdateBookingStatusByTechnician({
  bookingId,
  currentStatus,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (status: TechnicianSettableStatus) => {
    startTransition(async () => {
      try {
        await updateBookingStatus(bookingId, { status });
        toast.success("Booking status updated.");
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update booking status.",
        );
      }
    });
  };

  // Only show the action(s) that are valid from the *current* status,
  // matching the flow: REQUESTED -> ACCEPTED/DECLINED -> (customer pays) ->
  // PAID -> IN_PROGRESS -> COMPLETED.
  switch (currentStatus) {
    case "REQUESTED":
      return (
        <div className="flex gap-2">
          <Button
            size="sm"
            disabled={isPending}
            onClick={() => handleStatusChange("ACCEPTED")}
          >
            <Check className="mr-1 h-4 w-4" />
            Accept
          </Button>
          <Button
            size="sm"
            variant="destructive"
            disabled={isPending}
            onClick={() => handleStatusChange("DECLINED")}
          >
            <X className="mr-1 h-4 w-4" />
            Decline
          </Button>
        </div>
      );

    case "ACCEPTED":
      return (
        <span className="text-sm text-muted-foreground">
          Waiting for customer payment…
        </span>
      );

    case "PAID":
      return (
        <Button
          size="sm"
          disabled={isPending}
          onClick={() => handleStatusChange("IN_PROGRESS")}
        >
          <PlayCircle className="mr-1 h-4 w-4" />
          Mark In-Progress
        </Button>
      );

    case "IN_PROGRESS":
      return (
        <Button
          size="sm"
          disabled={isPending}
          onClick={() => handleStatusChange("COMPLETED")}
        >
          <CheckCircle2 className="mr-1 h-4 w-4" />
          Mark Completed
        </Button>
      );

    // COMPLETED, DECLINED, CANCELLED are terminal — nothing for the
    // technician to do here.
    default:
      return null;
  }
}
