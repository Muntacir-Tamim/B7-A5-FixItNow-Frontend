"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CreateReviewPayload {
  bookingId: string;
  rating: number;
  comment: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

export async function leaveReview(
  payload: CreateReviewPayload,
): Promise<ApiResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: JSON.stringify({
        bookingId: payload.bookingId,
        rating: payload.rating,
        comment: payload.comment,
      }),
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Create Review Error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Something went wrong while creating the review.",
    };
  }
}
