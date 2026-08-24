"use server";

import { cookies } from "next/headers";

export const getBookingsByTechnician = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technicians/bookings`,
      {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok) {
      console.error("Technician bookings fetch failed:", result?.message);
      return { success: false, data: [] };
    }

    return result;
  } catch (error) {
    console.error("Error fetching technician bookings:", error);
    return { success: false, data: [] };
  }
};
