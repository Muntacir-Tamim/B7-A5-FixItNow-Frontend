import { RegisterFormData } from "@/schemas/register.schema";

type RegisterResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

export async function registerUser(
  data: RegisterFormData
): Promise<RegisterResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const result: RegisterResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed.");
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Something went wrong. Please try again.");
  }
}