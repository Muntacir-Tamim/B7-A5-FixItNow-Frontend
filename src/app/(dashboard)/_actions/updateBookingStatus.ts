"use server";

import { cookies } from "next/headers";

type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

interface UpdateBookingStatusPayload {
  status: BookingStatus;
}

const TECHNICIAN_STATUSES: BookingStatus[] = [
  "ACCEPTED",
  "DECLINED",
  "IN_PROGRESS",
  "COMPLETED",
];

export async function updateBookingStatus(
  bookingId: string,
  payload: UpdateBookingStatusPayload,
) {
  const token = (await cookies()).get("accessToken")?.value;

  const isTechnicianAction = TECHNICIAN_STATUSES.includes(payload.status);

  const url = isTechnicianAction
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/technicians/bookings/${bookingId}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}/cancel`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update booking.");
  }
  return result;
}
