export interface BookingSlot {
  id: string;

  serviceId: string;
  bookingId: string | null;

  date: string;

  startsAt: string;
  endsAt: string;

  isAvailable: boolean;
  isBooked: boolean;

  note: string | null;

  bookingDeadline: string | null;

  maxBookings: number;
  bookedCount: number;

  createdAt: string;
  updatedAt: string;
}
