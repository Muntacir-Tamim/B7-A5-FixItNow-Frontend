"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const createTechnicianProfile = async (formData: {
  bio: string;
  skills: string[];
  experience: number;
  location: string;
}) => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/technicians/profile`,
    {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message || "Failed to create profile.");
  }

  revalidatePath("/technician-dashboard/profile");
  return result;
};
