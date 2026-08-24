"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("Unauthorized. No access token found.");
    }

    const res = await fetch(`${API_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to fetch users.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
      data: [],
    };
  }
};
