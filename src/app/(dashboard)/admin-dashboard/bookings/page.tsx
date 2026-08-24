import { getAllBookings } from "../../_actions/getAllBookings";
import { BookingsTable } from "../../_components/BookingsTable";

export default async function AdminBookingPage() {
  const response = await getAllBookings();

  const bookings = response?.data ?? response ?? [];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">Manage all customer bookings</p>
        </div>
      </div>

      <BookingsTable data={bookings} />
    </div>
  );
}
