"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { ReviewFormValues, reviewSchema } from "@/schemas/reviewSchema";
import { leaveReview } from "../_actions/LeaveReview";

interface LeaveReviewFormProps {
  bookingId: string;
}

export default function LeaveReviewForm({ bookingId }: LeaveReviewFormProps) {
  const router = useRouter();
  const [hoveredStar, setHoveredStar] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      bookingId,
      rating: 5,
      comment: "",
    },
  });

  const rating = watch("rating");

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      const result = await leaveReview({
        bookingId: data.bookingId,
        rating: data.rating,
        comment: data.comment,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Review submitted successfully!");
      router.push("/dashboard/my-bookings");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Leave a Review</CardTitle>
        <CardDescription>
          Share your experience with the technician.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input type="hidden" {...register("bookingId")} />

          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setValue("rating", star)}
                >
                  <Star
                    className={`h-8 w-8 transition ${
                      star <= (hoveredStar || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating.message}</p>
            )}
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label>Comment</Label>
            <Textarea
              rows={6}
              placeholder="Tell us about your experience..."
              {...register("comment")}
            />
            {errors.comment && (
              <p className="text-sm text-red-500">{errors.comment.message}</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Star className="mr-2 h-4 w-4" />
                  Submit Review
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </>
  );
}
