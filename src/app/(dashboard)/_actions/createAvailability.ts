"use server";

import { cookies } from "next/headers";

export interface AvailabilitySlot {
  day:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface CreateAvailabilityPayload {
  slots: AvailabilitySlot[];
}

export interface CreateAvailabilityResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export async function createAvailability(
  payload: CreateAvailabilityPayload,
): Promise<CreateAvailabilityResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized. Please login again.",
      };
    }

    if (!payload.slots || payload.slots.length === 0) {
      return {
        success: false,
        message: "At least one availability slot is required.",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technicians/availability`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slots: payload.slots }),
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to update availability.",
      };
    }

    return {
      success: true,
      message: result.message || "Availability updated successfully.",
      data: result.data,
    };
  } catch (error) {
    console.error("Create Availability Error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
