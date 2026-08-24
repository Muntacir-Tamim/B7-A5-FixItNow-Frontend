"use server";

import { cookies } from "next/headers";

export interface CreateServicePayload {
  title: string;
  description: string;
  price: number;
  location?: string;
  categoryId: string;
  status?: "ACTIVE" | "INACTIVE";
}

export async function createService(data: CreateServicePayload) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        categoryId: data.categoryId,
        status: data.status ?? "ACTIVE",
      }),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to create service");
    }

    return result;
  } catch (error) {
    console.error("Create Service Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
