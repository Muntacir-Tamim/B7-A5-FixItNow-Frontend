"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBookingById = async (bookingId: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
      next: {
        tags: ["booking"],
      },
      cache: "no-store",
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.error("Failed to fetch booking:", error);

    return {
      success: false,
      message: "Failed to fetch booking.",
      data: null,
    };
  }
};
