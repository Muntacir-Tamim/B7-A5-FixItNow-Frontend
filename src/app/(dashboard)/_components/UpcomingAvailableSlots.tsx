"use client";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Slot {
  id: number;
  date: string;
  day: string;
  time: string;
  status: "AVAILABLE" | "BOOKED";
}

const upcomingSlots: Slot[] = [
  {
    id: 1,
    day: "Monday",
    date: "03 Aug 2026",
    time: "09:00 AM",
    status: "AVAILABLE",
  },
  {
    id: 2,
    day: "Monday",
    date: "03 Aug 2026",
    time: "11:00 AM",
    status: "AVAILABLE",
  },
  {
    id: 3,
    day: "Tuesday",
    date: "04 Aug 2026",
    time: "10:30 AM",
    status: "AVAILABLE",
  },
  {
    id: 4,
    day: "Wednesday",
    date: "05 Aug 2026",
    time: "02:00 PM",
    status: "AVAILABLE",
  },
  {
    id: 5,
    day: "Thursday",
    date: "06 Aug 2026",
    time: "04:00 PM",
    status: "AVAILABLE",
  },
];

export default function UpcomingAvailableSlots() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Upcoming Available Slots</CardTitle>

          <CardDescription>
            Your next available booking times.
          </CardDescription>
        </div>

        <Button variant="outline">
          View All

          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {upcomingSlots.map((slot) => (
            <div
              key={slot.id}
              className="flex flex-col gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />

                  <span className="font-medium">
                    {slot.day}
                  </span>

                  <span className="text-muted-foreground">
                    •
                  </span>

                  <span className="text-muted-foreground">
                    {slot.date}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-primary" />

                  <span>{slot.time}</span>
                </div>
              </div>

              <Badge className="w-fit">
                {slot.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}