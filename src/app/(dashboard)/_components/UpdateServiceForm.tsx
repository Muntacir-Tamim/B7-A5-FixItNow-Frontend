"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { updateService } from "../_actions/updateService";
import { IServiceDetails } from "../_actions/getServiceById";

type CategoryProps = {
  id: string;
  name: string;
};

type FormValues = {
  categoryId: string;
  title: string;
  description: string;
  price: number;
  location: string;
  status: "ACTIVE" | "INACTIVE";
};

export interface UpdateServiceFormProps {
  serviceId: string;
  categories: CategoryProps[];
  service: IServiceDetails | null;
}

export default function UpdateServiceForm({
  serviceId,
  categories,
  service,
}: UpdateServiceFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      categoryId: service?.categoryId ?? "",
      title: service?.title ?? "",
      description: service?.description ?? "",
      price: Number(service?.price) ?? 0,
      location: service?.location ?? "",
      status: service?.status ?? "ACTIVE",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    startTransition(async () => {
      try {
        const result = await updateService({ ...data, serviceId });

        if (!result.success) {
          throw new Error(result.message);
        }

        toast.success("Service updated successfully");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "Failed to update service.",
        );
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-3xl space-y-6 rounded-lg border p-6"
    >
      <h1 className="text-3xl font-bold">Update Service</h1>

      <div className="space-y-2">
        <label className="block font-medium">Category</label>
        <select
          {...register("categoryId", { required: "Category is required" })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Select Category</option>
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
        <label className="block font-medium">Title</label>
        <input
          {...register("title", {
            required: "Title is required",
            minLength: { value: 3, message: "Min 3 characters" },
          })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Description</label>
        <textarea
          rows={5}
          {...register("description", {
            required: "Description is required",
            minLength: { value: 10, message: "Min 10 characters" },
          })}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Price (৳)</label>
        <input
          type="number"
          {...register("price", {
            valueAsNumber: true,
            required: "Price is required",
            min: { value: 1, message: "Must be positive" },
          })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        {errors.price && (
          <p className="text-sm text-destructive">{errors.price.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">
          Location <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          {...register("location")}
          placeholder="e.g. Dhaka, Mirpur"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Status</label>
        <select
          {...register("status")}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="ACTIVE">Active (visible to customers)</option>
          <option value="INACTIVE">Inactive (hidden)</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground disabled:opacity-50"
      >
        {isPending ? "Updating..." : "Update Service"}
      </button>
    </form>
  );
}
