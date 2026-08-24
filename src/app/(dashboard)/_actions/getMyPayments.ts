"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: string | null; // e.g. "card" — set by webhook
  provider: "STRIPE" | "SSLCOMMERZ";
  status: "PENDING" | "COMPLETED" | "FAILED";
  transactionId: string | null;
  stripeSessionId: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;

  booking?: {
    id: string;
    scheduledDate: string;
    scheduledTime: string;
    totalAmount: number;
    service?: {
      id: string;
      title: string;
    } | null;
    technicianProfile?: {
      user: {
        name: string;
        email: string;
      };
    } | null;
  } | null;
}

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Payment[];
}

export async function getMyPayments(): Promise<ApiResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${API_URL}/api/payments`, {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch payments.");
  }

  return result;
}
