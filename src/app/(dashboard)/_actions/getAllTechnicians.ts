"use server";

export interface GetAllTechniciansParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  location?: string;
  skills?: string;
}

export interface TechnicianProfile {
  id: string;
  userId: string;
  bio: string | null;
  profilePhoto: string;
  description: string | null;
  profession: string | null;
  skills: string[] | null;
  experience: number | null;
  hourlyRate: number | null;
  averageRating: number;
  totalReviews: number;
  totalCompletedJobs: number;
  isAvailable: boolean;
  responseTime: string | null;
  isApproved: boolean;
  address: string | null;
  city: string | null;
  district: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "ACTIVE" | "BANNED";
  role: "TECHNICIAN";
  isVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  technicianProfile: TechnicianProfile;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface GetAllTechniciansResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Technician[];
  meta: PaginationMeta;
}

export async function getAllTechnicians(
  filters: GetAllTechniciansParams = {},
): Promise<GetAllTechniciansResponse> {
  try {
    const params = new URLSearchParams();

    // Pagination
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    // Filters — must match backend ITechnicianQuery field names
    if (filters.searchTerm) params.append("searchTerm", filters.searchTerm);
    if (filters.location) params.append("location", filters.location);
    if (filters.skills) params.append("skills", filters.skills);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technicians?${params.toString()}`,
      {
        method: "GET",
        next: {
          tags: ["technicians"],
        },
      },
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch technicians.");
    }

    return result;
  } catch (error) {
    console.error("Error fetching technicians:", error);

    return {
      success: false,
      statusCode: 500,
      message: error instanceof Error ? error.message : "Something went wrong.",
      data: [],
      meta: {
        page: filters.page ?? 1,
        limit: filters.limit ?? 10,
        total: 0,
        totalPage: 0,
      },
    };
  }
}
