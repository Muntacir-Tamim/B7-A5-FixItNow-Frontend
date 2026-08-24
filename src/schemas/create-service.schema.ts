import { z } from "zod";

export const createServiceSchema = z.object({
  title: z
    .string()
    .min(1, "Service title is required")
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must not exceed 255 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  price: z
    .number({ error: "Price is required" })
    .positive("Price must be a positive number"),
  location: z.string().optional(),
  categoryId: z
    .string()
    .min(1, "Category is required")
    .uuid("Invalid category ID"),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export type CreateServiceFormData = z.infer<typeof createServiceSchema>;
