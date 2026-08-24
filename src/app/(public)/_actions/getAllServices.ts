"use server";

export const getAllServices = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();

  const getValue = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const searchTerm = getValue(query?.searchTerm);
  const categoryId = getValue(query?.categoryId);
  const location = getValue(query?.location);
  const minPrice = getValue(query?.minPrice);
  const maxPrice = getValue(query?.maxPrice);
  const sortBy = getValue(query?.sortBy);
  const sortOrder = getValue(query?.sortOrder);
  const page = getValue(query?.page);
  const limit = getValue(query?.limit);

  if (searchTerm) params.set("searchTerm", searchTerm);
  if (categoryId) params.set("categoryId", categoryId);
  if (location) params.set("location", location);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder) params.set("sortOrder", sortOrder);
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services?${params.toString()}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
};
