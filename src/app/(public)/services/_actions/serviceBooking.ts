"use server";

import { cookies } from "next/headers";

interface ServiceBookingPayload {
  serviceId: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  note?: string;
}

export const serviceBooking = async ({
  serviceId,
  scheduledDate,
  scheduledTime,
  address,
  note,
}: ServiceBookingPayload) => {
  const token = (await cookies()).get("accessToken")?.value;
  try {
    const bookingRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          serviceId,
          scheduledDate,
          scheduledTime,
          address,
          note,
        }),
        cache: "no-store",
      }
    );

    const result = await bookingRes.json();

    if (!bookingRes.ok) {
      throw new Error(result.message || "Booking failed.");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
