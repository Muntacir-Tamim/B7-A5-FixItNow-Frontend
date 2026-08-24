"use server";

import { cookies } from "next/headers";

export const GetNewAccessToken = async ()=>{
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;

    if(!refreshToken){
        // throw new Error("User Not Logged In!")

        return{
            success: false,
            message: "Refresh Token not found!"
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
            // Authorization: `Bearer ${accessToken}`
            // Authorization: `${accessToken}`
            Cookie: `refreshToken=${refreshToken}`
        },
        cache: "no-cache",
    });

    const result = await res.json();
    return result;
}