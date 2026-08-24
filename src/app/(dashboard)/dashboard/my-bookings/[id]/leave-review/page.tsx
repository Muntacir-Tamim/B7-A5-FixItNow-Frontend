import { getBookingById } from "@/app/(dashboard)/_actions/getBookingById";
import LeaveReviewForm from "@/app/(dashboard)/_components/LeaveReviewForm";
import { notFound } from "next/navigation";

export default async function LeaveReview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getBookingById(id);
  const booking = result?.data;

  if (!booking) {
    notFound();
  }

  if (booking.status !== "COMPLETED") {
    return (
      <div className="container mx-auto max-w-3xl py-10 text-center">
        <p className="text-muted-foreground">
          You can only leave a review for completed bookings.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <LeaveReviewForm bookingId={booking.id} />
    </div>
  );
}
