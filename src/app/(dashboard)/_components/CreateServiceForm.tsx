"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createService } from "../_actions/createService";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  CreateServiceFormData,
  createServiceSchema,
} from "@/schemas/create-service.schema";

type CategoryProps = {
  id: string;
  name: string;
};

type CreateServiceFormProps = {
  categories: CategoryProps[];
};

export default function CreateServiceForm({
  categories,
}: CreateServiceFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateServiceFormData>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      categoryId: "",
      title: "",
      description: "",
      price: 0,
      location: "",
      status: "ACTIVE",
    },
  });

  const onSubmit = async (data: CreateServiceFormData) => {
    try {
      const result = await createService(data);

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success("Service created successfully!");
      router.push("/technician-dashboard/services");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create service", {
        description:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Create New Service
          </CardTitle>
          <CardDescription>
            Fill in the information below to publish your service.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...register("categoryId")}
              >
                <option value="">Select a Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-sm text-destructive">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input
                id="title"
                placeholder="e.g. AC Repair & Servicing"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Describe what this service includes..."
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price (৳)</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g. 500"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-sm text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">
                Location{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="location"
                placeholder="e.g. Dhaka, Mirpur"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-sm text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...register("status")}
              >
                <option value="ACTIVE">Active (visible to customers)</option>
                <option value="INACTIVE">Inactive (hidden)</option>
              </select>
              {errors.status && (
                <p className="text-sm text-destructive">
                  {errors.status.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Service..." : "Create Service"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
