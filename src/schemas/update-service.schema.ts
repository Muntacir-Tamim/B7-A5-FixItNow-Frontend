import { z } from "zod";

export const updateServiceSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().min(10).optional(),
  price: z.number().positive().optional(),
  location: z.string().optional(),
  categoryId: z.string().uuid("Invalid category ID").optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export type UpdateServiceFormData = z.infer<typeof updateServiceSchema>;
