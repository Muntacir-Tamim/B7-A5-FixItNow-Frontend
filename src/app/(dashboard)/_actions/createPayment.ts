"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CreatePaymentPayload {
  bookingId: string;
  provider?: "STRIPE" | "SSLCOMMERZ";
}

interface PaymentResult {
  success: boolean;
  message: string;
  data: { paymentUrl?: string } | null;
}

export const createPayment = async (
  payload: CreatePaymentPayload,
): Promise<PaymentResult> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        bookingId: payload.bookingId,
        provider: payload.provider ?? "STRIPE",
      }),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to create payment",
        data: null,
      };
    }

    return {
      success: true,
      message: result?.message || "Payment session created successfully",
      data: result?.data,
    };
  } catch (error) {
    console.error("Create Payment Error:", error);
    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};

// Stripe এর জন্য shorthand — StripeButton এ এটা import করো
export const createCheckoutSession = async (bookingId: string) =>
  createPayment({ bookingId, provider: "STRIPE" });
