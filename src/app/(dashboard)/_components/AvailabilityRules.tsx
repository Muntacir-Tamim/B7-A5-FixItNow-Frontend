"use client";

import { Plus, Save, Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createAvailability,
  type AvailabilitySlot,
} from "../_actions/createAvailability";

// Backend-compatible days
const DAYS = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
  { value: "SUNDAY", label: "Sunday" },
] as const;

type DayValue = (typeof DAYS)[number]["value"];

interface SlotRow {
  id: number; // local UI key only
  day: DayValue;
  startTime: string;
  endTime: string;
}

let localIdCounter = 1;

export default function AvailabilityRules() {
  const router = useRouter();

  const [slots, setSlots] = useState<SlotRow[]>([
    {
      id: localIdCounter++,
      day: "MONDAY",
      startTime: "09:00",
      endTime: "17:00",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Add a new blank slot row
  const addSlot = () => {
    setSlots((prev) => [
      ...prev,
      {
        id: localIdCounter++,
        day: "MONDAY",
        startTime: "09:00",
        endTime: "17:00",
      },
    ]);
  };

  // Remove a slot row
  const removeSlot = (id: number) => {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  };

  // Update a field in a slot row
  const updateSlot = (
    id: number,
    field: keyof Omit<SlotRow, "id">,
    value: string,
  ) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  // Save → call backend
  const handleSave = async () => {
    setMessage(null);

    // Basic validation
    for (const slot of slots) {
      if (!slot.startTime || !slot.endTime) {
        setMessage({ type: "error", text: "সব slot এ start ও end time দিন।" });
        return;
      }
      if (slot.startTime >= slot.endTime) {
        setMessage({
          type: "error",
          text: `${slot.day}: End time must be after start time.`,
        });
        return;
      }
    }

    const payload: AvailabilitySlot[] = slots.map((s) => ({
      day: s.day,
      startTime: s.startTime, // already "HH:MM" from <input type="time">
      endTime: s.endTime,
    }));

    setLoading(true);
    try {
      const result = await createAvailability({ slots: payload });
      if (result.success) {
        setMessage({ type: "success", text: result.message });
        router.refresh(); // re-fetch page data so Weekly Schedule updates
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          Availability Rules
        </CardTitle>

        <CardDescription>
          Configure your working days and hours. Each row = one availability
          slot sent to the backend.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Slot rows */}
        <div className="space-y-3">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="flex flex-wrap items-end gap-3 rounded-lg border p-4"
            >
              {/* Day */}
              <div className="flex-1 min-w-[140px] space-y-1">
                <Label>Day</Label>
                <Select
                  value={slot.day}
                  onValueChange={(val) => updateSlot(slot.id, "day", val)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map((d) => (
                      <SelectItem key={d.value} value={d.value}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Start Time */}
              <div className="flex-1 min-w-[120px] space-y-1">
                <Label>Start Time</Label>
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) =>
                    updateSlot(slot.id, "startTime", e.target.value)
                  }
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              {/* End Time */}
              <div className="flex-1 min-w-[120px] space-y-1">
                <Label>End Time</Label>
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) =>
                    updateSlot(slot.id, "endTime", e.target.value)
                  }
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              {/* Remove */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => removeSlot(slot.id)}
                disabled={slots.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add slot */}
        <Button
          type="button"
          variant="outline"
          onClick={addSlot}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Slot
        </Button>

        {/* Feedback message */}
        {message && (
          <p
            className={`text-sm font-medium ${
              message.type === "success" ? "text-green-600" : "text-destructive"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Save */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading || slots.length === 0}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : "Save Availability"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
