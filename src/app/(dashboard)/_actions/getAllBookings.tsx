"use server";

import { cookies } from "next/headers";

export const getAllBookings = async (query?: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const params = new URLSearchParams();
    if (query?.page) params.set("page", String(query.page));
    if (query?.limit) params.set("limit", String(query.limit));
    if (query?.status) params.set("status", query.status);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
        cache: "no-store",
      },
    );

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return { success: false, message: "Failed to fetch bookings.", data: [] };
  }
};
