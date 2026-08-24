import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  email: z.email("Please enter a valid email"),

  phone: z.string().min(11, "Invalid phone number"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  role: z.enum(["CUSTOMER", "TECHNICIAN"]),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
