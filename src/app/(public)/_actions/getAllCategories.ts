"use server";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { services: number };
}

export interface GetAllCategoriesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Category[];
}

export async function getAllCategories(): Promise<GetAllCategoriesResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      {
        next: {
          tags: ["categories"],
        },
      },
    );

    const result: GetAllCategoriesResponse = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.error("Get Categories Error:", error);

    return {
      success: false,
      statusCode: 500,
      message: "Failed to fetch categories",
      data: [],
    };
  }
}
