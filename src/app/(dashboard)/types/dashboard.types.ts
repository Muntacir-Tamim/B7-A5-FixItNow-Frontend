export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  technicianProfile?: {
    id: string;
    bio?: string;
    profilePhoto?: string;
    availability?: unknown[];
  } | null;
}

export interface ApiResponse {
  data: IUserProfile;
  message: string;
  statusCode: number;
  success: boolean;
}
