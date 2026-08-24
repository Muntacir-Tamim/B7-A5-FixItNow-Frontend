"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTechnicianById = async (technicianId: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_URL}/api/technicians/${technicianId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to fetch technician profile.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching technician profile:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching technician profile.",
      data: null,
    };
  }
};
