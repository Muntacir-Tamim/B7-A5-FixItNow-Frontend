import { getServiceById } from "@/app/(dashboard)/_actions/getServiceById";
import UpdateServiceForm from "@/app/(dashboard)/_components/UpdateServiceForm";
import { getAllCategories } from "@/app/(public)/_actions/getAllCategories";

type Props = {
  params: Promise<{
    serviceId: string;
  }>;
};

export default async function ServiceEditPage({ params }: Props) {
  const { serviceId } = await params;

  const result = await getAllCategories();
  const service = await getServiceById(serviceId);

  return (
    <UpdateServiceForm
      serviceId={serviceId}
      categories={result.data ?? []}
      service={service}
    />
  );
}
