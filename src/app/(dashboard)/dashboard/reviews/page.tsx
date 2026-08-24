import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { getAllReviews, Review } from "../../_actions/getAllReviews";

export default async function ReviewsPage() {
  const reviews: Review[] = await getAllReviews();

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">My Reviews</CardTitle>
          <CardDescription>
            View all the reviews you've submitted.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Technician</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {reviews.length > 0 ? (
                reviews.map((review: Review) => {
                  const techProfile = review.service?.technicianProfile;
                  const technicianName =
                    techProfile?.user?.name ?? "Unknown Technician";

                  return (
                    <TableRow key={review.id}>
                      {/* Technician */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={
                                techProfile?.profilePhoto ||
                                "/placeholder-user.jpg"
                              }
                              alt={technicianName}
                            />
                            <AvatarFallback>
                              {technicianName
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <p className="font-medium">{technicianName}</p>
                            <p className="text-sm text-muted-foreground">
                              Technician
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Service */}
                      <TableCell>
                        <Badge variant="secondary">
                          {review.service?.title ?? "N/A"}
                        </Badge>
                      </TableCell>

                      {/* Rating */}
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${
                                index < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {review.rating}/5
                          </span>
                        </div>
                      </TableCell>

                      {/* Comment */}
                      <TableCell className="max-w-xs">
                        <p className="line-clamp-2 text-sm">{review.comment}</p>
                      </TableCell>

                      {/* Date */}
                      <TableCell>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Published
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-40 text-center text-muted-foreground"
                  >
                    No reviews found. Complete a booking and leave a review!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
