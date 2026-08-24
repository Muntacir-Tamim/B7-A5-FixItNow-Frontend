import AddBookingSlotForm from "@/app/(dashboard)/_components/AddBookingSlotForm";
import { getMe } from "@/services/getMe";
import { getTechnicianById } from "@/app/(dashboard)/_actions/getTechnicianById";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { AvailabilitySlot } from "@/app/(dashboard)/_actions/createAvailability";

type Props = {
  params: Promise<{
    serviceId: string;
  }>;
};

export default async function AddServiceBookingSlotspage({ params }: Props) {
  await params;

  const meResult = await getMe();
  const technicianProfileId: string | undefined =
    meResult?.data?.technicianProfile?.id;

  let existingSlots: AvailabilitySlot[] = [];
  if (technicianProfileId) {
    const profileResult = await getTechnicianById(technicianProfileId);
    existingSlots = (profileResult?.data?.availability ?? []).map(
      (slot: { day: string; startTime: string; endTime: string }) => ({
        day: slot.day as AvailabilitySlot["day"],
        startTime: slot.startTime,
        endTime: slot.endTime,
      }),
    );
  }

  return (
    <section className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Add Availability Slot</h1>

          <p className="mt-2 text-muted-foreground">
            Availability is set per weekday for your whole profile (not per
            service) — customers can book this service during any of your
            configured hours.
          </p>
        </div>

        <Link
          href="/technician-dashboard/services"
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <AddBookingSlotForm existingSlots={existingSlots} />
      </div>
    </section>
  );
}
