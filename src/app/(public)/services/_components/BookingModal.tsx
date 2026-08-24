"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, AlertCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { serviceBooking } from "../_actions/serviceBooking";
import { toast } from "sonner";

interface AvailabilitySlot {
  id: string;
  day: string; // MONDAY | TUESDAY | ... | SUNDAY
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
}

interface BookingModalProps {
  serviceId: string;
  isAvailable?: boolean;
  availability?: AvailabilitySlot[];
}

const DAY_INDEX_TO_NAME = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const DAY_LABELS: Record<string, string> = {
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
  SUNDAY: "Sun",
};

// Backend expects scheduledDate as ISO date (e.g. 2025-08-15) and
// scheduledTime as HH:MM. There's no per-slot table in the schema — a
// technician sets a weekly working window per day (Availability model),
// so we use that to show which days are open and clamp the time picker to
// that day's window, instead of letting the customer type any date/time.
export default function BookingModal({
  serviceId,
  isAvailable = true,
  availability = [],
}: BookingModalProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  const availableDays = useMemo(
    () => new Set(availability.map((a) => a.day)),
    [availability],
  );

  const hasAvailabilitySet = availability.length > 0;

  // The technician's working window for the currently selected date's
  // weekday, if any.
  const windowForSelectedDate = useMemo(() => {
    if (!date || !hasAvailabilitySet) return null;
    const dayName = DAY_INDEX_TO_NAME[new Date(date + "T00:00:00").getDay()];
    return availability.find((a) => a.day === dayName) ?? null;
  }, [date, availability, hasAvailabilitySet]);

  const isSelectedDateUnavailable =
    hasAvailabilitySet && !!date && !windowForSelectedDate;

  const resetForm = () => {
    setDate("");
    setTime("");
    setAddress("");
    setNote("");
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    // Clear a time that no longer fits the new date's window.
    setTime("");
  };

  const handleContinue = async () => {
    if (!date) {
      toast.error("Please select a date.");
      return;
    }

    if (isSelectedDateUnavailable) {
      toast.error("The technician isn't available on this day.");
      return;
    }

    if (!time) {
      toast.error("Please select a time.");
      return;
    }

    if (
      windowForSelectedDate &&
      (time < windowForSelectedDate.startTime ||
        time > windowForSelectedDate.endTime)
    ) {
      toast.error(
        `Please pick a time between ${windowForSelectedDate.startTime} and ${windowForSelectedDate.endTime}.`,
      );
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter your address.");
      return;
    }

    try {
      setLoading(true);

      const result = await serviceBooking({
        serviceId,
        scheduledDate: date,
        scheduledTime: time,
        address: address.trim(),
        note: note.trim() || undefined,
      });

      if (result.success) {
        toast.success("Booking created successfully.");
        setOpen(false);
        resetForm();
        router.push("/dashboard");
      } else {
        toast.error(result.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full" size="lg" disabled={!isAvailable}>
          {isAvailable ? "Book This Service" : "Currently Unavailable"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Book This Service</DialogTitle>

          <DialogDescription>
            Pick a date and time that works for you.
          </DialogDescription>
        </DialogHeader>

        {hasAvailabilitySet && (
          <div className="rounded-lg border bg-muted/40 p-3 text-xs">
            <p className="mb-1.5 font-medium text-muted-foreground">
              Technician&apos;s available days
            </p>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(DAY_LABELS).map((day) => {
                const slot = availability.find((a) => a.day === day);
                const isOpen = availableDays.has(day);
                return (
                  <span
                    key={day}
                    title={
                      slot ? `${slot.startTime} - ${slot.endTime}` : "Unavailable"
                    }
                    className={`rounded-md px-2 py-1 font-medium ${
                      isOpen
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        : "bg-muted text-muted-foreground/50 line-through"
                    }`}
                  >
                    {DAY_LABELS[day]}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Date & Time */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="date"
              className="mb-2 flex items-center gap-2 text-sm font-medium"
            >
              <Calendar className="h-4 w-4" />
              Date <span className="text-red-500">*</span>
            </label>

            <input
              id="date"
              type="date"
              min={todayStr}
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="mb-2 flex items-center gap-2 text-sm font-medium"
            >
              <Clock className="h-4 w-4" />
              Time <span className="text-red-500">*</span>
            </label>

            <input
              id="time"
              type="time"
              value={time}
              min={windowForSelectedDate?.startTime}
              max={windowForSelectedDate?.endTime}
              disabled={isSelectedDateUnavailable}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {isSelectedDateUnavailable && (
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            The technician doesn&apos;t work on this day. Please pick another
            date.
          </div>
        )}

        {windowForSelectedDate && (
          <p className="text-xs text-muted-foreground">
            Available {windowForSelectedDate.startTime} –{" "}
            {windowForSelectedDate.endTime} on this day.
          </p>
        )}

        {/* Address Field */}
        <div className="mt-2">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Your Address <span className="text-red-500">*</span>
          </label>

          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full address..."
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Booking Note */}
        <div className="mt-3">
          <label htmlFor="note" className="mb-2 block text-sm font-medium">
            Booking Note{" "}
            <span className="text-muted-foreground">(optional)</span>
          </label>

          <textarea
            id="note"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Tell the technician about your challenge in detail..."
            rows={3}
            maxLength={500}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />

          <div className="mt-1 flex justify-end text-xs text-muted-foreground">
            {note.length}/500
          </div>
        </div>

        <Button
          className="w-full"
          disabled={loading || isSelectedDateUnavailable}
          onClick={handleContinue}
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
