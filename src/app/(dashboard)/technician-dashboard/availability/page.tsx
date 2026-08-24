import { getMe } from "@/services/getMe";
import { getTechnicianById } from "../../_actions/getTechnicianById";
import AvailabilityRules from "../../_components/AvailabilityRules";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock3 } from "lucide-react";

const DAY_LABELS: Record<string, string> = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
};

const DAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

interface AvailabilitySlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export default async function AvailabilityPage() {
  const meResult = await getMe();
  const technicianProfileId: string | undefined =
    meResult?.data?.technicianProfile?.id;

  let availability: AvailabilitySlot[] = [];

  if (technicianProfileId) {
    const profileResult = await getTechnicianById(technicianProfileId);
    availability = profileResult?.data?.availability ?? [];
  }

  const sortedAvailability = [...availability].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day),
  );

  const activeDays = new Set(availability.map((s) => s.day)).size;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Availability</h1>

        <p className="mt-2 text-muted-foreground">
          Manage your working schedule and booking slots.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Days
            </CardTitle>

            <div className="rounded-lg bg-muted p-2">
              <Clock3 className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">{activeDays}</div>

            <p className="mt-1 text-sm text-muted-foreground">
              Days with set availability
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Slots
            </CardTitle>

            <div className="rounded-lg bg-muted p-2">
              <Clock3 className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">{availability.length}</div>

            <p className="mt-1 text-sm text-muted-foreground">
              Configured availability slots
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>

        <CardContent>
          {sortedAvailability.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No availability set yet. Use the rules below to configure your
              schedule.
            </p>
          ) : (
            <div className="space-y-3">
              {sortedAvailability.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between rounded-lg border px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="w-24 justify-center">
                      {DAY_LABELS[slot.day] ?? slot.day}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock3 className="h-4 w-4" />
                    <span>
                      {slot.startTime} — {slot.endTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AvailabilityRules />
    </div>
  );
}
