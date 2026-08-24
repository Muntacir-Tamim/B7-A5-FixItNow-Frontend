import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddBookingSlotForm from "@/app/(dashboard)/_components/AddBookingSlotForm";
import { getMe } from "@/services/getMe";
import { getTechnicianById } from "@/app/(dashboard)/_actions/getTechnicianById";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ serviceId: string }>;
};

export default async function AddServiceBookingSlotsPage({ params }: Props) {
  const { serviceId } = await params;

  const meRes = await getMe();
  const me = meRes?.data;

  if (!me) return notFound();

  const techRes = await getTechnicianById(me.id);
  const technicianProfileId = techRes?.data?.technicianProfile?.id;

  if (!technicianProfileId) return notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <Link
        href={`/technician-dashboard/services/${serviceId}/slots`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Slots
      </Link>

      <div>
        <h1 className="text-2xl font-bold">Add Availability Slot</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Set a new time slot when you are available for this service.
        </p>
      </div>

      <AddBookingSlotForm technicianProfileId={technicianProfileId} />
    </div>
  );
}
