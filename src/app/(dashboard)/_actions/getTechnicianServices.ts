"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTechnicianServices = async (technicianProfileId: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${API_URL}/api/technicians/${technicianProfileId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        next: { tags: ["technician-services"] },
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result?.message || "Failed to fetch technician services.",
      );
    }

    return {
      success: true,
      data: result?.data?.services ?? [],
    };
  } catch (error) {
    console.error("Error fetching technician services:", error);
    return { success: false, data: [], message: "Something went wrong." };
  }
};
