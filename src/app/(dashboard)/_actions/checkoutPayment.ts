"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CheckoutPayload {
  bookingId: string;
}

export const createCheckoutSession = async (
  payload: CheckoutPayload
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to create checkout session",
        data: null,
      };
    }

    return {
      success: true,
      message: result?.message || "Checkout session created successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Checkout Session Error:", error);

    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};
