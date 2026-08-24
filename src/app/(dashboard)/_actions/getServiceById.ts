"use server";

export interface IServiceDetails {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string | null;
  status: "ACTIVE" | "INACTIVE";
  categoryId: string;
  technicianProfileId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
  technicianProfile: {
    id: string;
    userId: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  reviews: { rating: number }[];
  _count: {
    reviews: number;
    bookings: number;
  };
}

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IServiceDetails;
}

export const getServiceById = async (
  serviceId: string,
): Promise<IServiceDetails | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceId}`,
      {
        method: "GET",
        next: { tags: [`service-${serviceId}`] },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch service.");
    }

    const result: ApiResponse = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
};
