
export type BackendUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
  status: string;
  authProvider: string;
  isVerified: boolean;
  profilePhoto?: string | null;
  password?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
};
