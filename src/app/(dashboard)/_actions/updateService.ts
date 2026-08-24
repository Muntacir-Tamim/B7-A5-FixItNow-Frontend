"use server";

import { cookies } from "next/headers";

export interface UpdateServicePayload {
  serviceId: string;
  title?: string;
  description?: string;
  price?: number;
  location?: string;
  categoryId?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export async function updateService(payload: UpdateServicePayload) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized. Please login again." };
    }

    const { serviceId, ...updateData } = payload;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result.message || "Failed to update service.",
      };
    }

    return result;
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong." };
  }
}
