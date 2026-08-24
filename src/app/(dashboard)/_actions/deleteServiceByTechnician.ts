"use server";

import { cookies } from "next/headers";

export interface DeleteServicePayload {
    serviceId: string;
}

export async function deleteServiceByTechnician(
    payload: DeleteServicePayload
) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Unauthorized. Please login again.",
            };
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/services/${payload.serviceId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                cache: "no-store",
            }
        );

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result?.message || "Failed to delete service.",
            };
        }

        return {
            success: true,
            message: result?.message || "Service deleted successfully.",
            data: result?.data,
        };
    } catch (error) {
        console.error("Delete Service Error:", error);

        return {
            success: false,
            message: "Something went wrong.",
        };
    }
}
