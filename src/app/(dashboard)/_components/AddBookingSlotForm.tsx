"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createAvailability,
  type AvailabilitySlot,
} from "@/app/(dashboard)/_actions/createAvailability";

interface AddBookingSlotFormProps {
  existingSlots?: AvailabilitySlot[];
}

const DAYS: { value: AvailabilitySlot["day"]; label: string }[] = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
  { value: "SUNDAY", label: "Sunday" },
];

export default function AddBookingSlotForm({
  existingSlots = [],
}: AddBookingSlotFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState<AvailabilitySlot>({
    day: "MONDAY",
    startTime: "09:00",
    endTime: "17:00",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.day || !form.startTime || !form.endTime) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (form.startTime >= form.endTime) {
      toast.error("End time must be after start time.");
      return;
    }

    startTransition(async () => {
      // Replace any existing slot for the same day, keep the rest.
      const mergedSlots: AvailabilitySlot[] = [
        ...existingSlots.filter((slot) => slot.day !== form.day),
        form,
      ];

      const result = await createAvailability({ slots: mergedSlots });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Day</label>

          <select
            name="day"
            value={form.day}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          >
            {DAYS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Start Time</label>

          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">End Time</label>

          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-orange-500 px-6 py-2 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Add Availability Slot"}
      </button>
    </form>
  );
}
