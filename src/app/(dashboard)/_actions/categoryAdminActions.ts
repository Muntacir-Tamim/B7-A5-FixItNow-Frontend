"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { services: number };
}

interface ApiResult<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Backend: GET /api/admin/categories (ADMIN)
export async function getAllCategoriesForAdmin(): Promise<ApiResult<Category[]>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_URL}/api/admin/categories`, {
      method: "GET",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch categories.");
    }

    return { success: true, message: result.message, data: result.data };
  } catch (error) {
    console.error("Get Admin Categories Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
      data: [],
    };
  }
}

// Backend: POST /api/admin/categories — categoryValidation.createCategorySchema
// { name (required, 2-255 chars), description?, icon? }
export interface CreateCategoryPayload {
  name: string;
  description?: string;
  icon?: string;
}

export async function createCategory(
  payload: CreateCategoryPayload
): Promise<ApiResult<Category>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized. Please login again." };
    }

    const res = await fetch(`${API_URL}/api/admin/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result?.message || "Failed to create category." };
    }

    revalidatePath("/admin-dashboard/categories");
    revalidatePath("/categories");

    return { success: true, message: result.message, data: result.data };
  } catch (error) {
    console.error("Create Category Error:", error);
    return { success: false, message: "Something went wrong." };
  }
}

// Backend: PATCH /api/admin/categories/:categoryId — categoryValidation.updateCategorySchema
export interface UpdateCategoryPayload {
  categoryId: string;
  name?: string;
  description?: string;
  icon?: string;
}

export async function updateCategory(
  payload: UpdateCategoryPayload
): Promise<ApiResult<Category>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized. Please login again." };
    }

    const { categoryId, ...updateData } = payload;

    const res = await fetch(`${API_URL}/api/admin/categories/${categoryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result?.message || "Failed to update category." };
    }

    revalidatePath("/admin-dashboard/categories");
    revalidatePath("/categories");

    return { success: true, message: result.message, data: result.data };
  } catch (error) {
    console.error("Update Category Error:", error);
    return { success: false, message: "Something went wrong." };
  }
}

// Backend: DELETE /api/admin/categories/:categoryId
export async function deleteCategory(categoryId: string): Promise<ApiResult<null>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized. Please login again." };
    }

    const res = await fetch(`${API_URL}/api/admin/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result?.message || "Failed to delete category." };
    }

    revalidatePath("/admin-dashboard/categories");
    revalidatePath("/categories");

    return { success: true, message: result.message };
  } catch (error) {
    console.error("Delete Category Error:", error);
    return { success: false, message: "Something went wrong." };
  }
}
