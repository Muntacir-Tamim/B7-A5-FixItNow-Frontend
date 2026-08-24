import { z } from "zod";

export const reviewSchema = z.object({
  bookingId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5, "Comment must be at least 5 characters.").max(500),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
