import { getAllServices } from "../(public)/_actions/getAllServices";
import { ServicesTable } from "./ServicesTable";

export async function ServicesListAdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const result = await getAllServices({ query });

  if (!result.success || !result.data?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No services found.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <ServicesTable data={result.data} />
    </div>
  );
}
