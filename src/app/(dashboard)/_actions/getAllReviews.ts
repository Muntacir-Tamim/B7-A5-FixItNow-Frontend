"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Review {
  id: string;
  customerId: string;
  serviceId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  service?: {
    id: string;
    title: string;
    technicianProfile?: {
      profilePhoto?: string;
      user: {
        name: string;
        email: string;
      };
    };
  };
}

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Review[];
}

export const getMyReviews = async (): Promise<Review[]> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    // Get all customer bookings (which include review data)
    const res = await fetch(`${API_URL}/api/bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return [];
    }

    const reviews: Review[] = result.data
      .filter((booking: { review: Review | null }) => booking.review !== null)
      .map(
        (booking: {
          review: Review;
          service?: Review["service"];
          technicianProfile?: {
            profilePhoto?: string;
            user: { name: string; email: string };
          };
        }) => ({
          ...booking.review,
          service: {
            ...booking.review.service,
            technicianProfile: booking.technicianProfile,
          },
        }),
      );

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

export const getAllReviews = getMyReviews;
