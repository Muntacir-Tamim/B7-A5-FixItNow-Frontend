import Link from "next/link";

import CreateServiceForm from "@/app/(dashboard)/_components/CreateServiceForm";
import { getAllCategories } from "@/app/(public)/_actions/getAllCategories";
import { getMe } from "@/services/getMe";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ServiceCreatePage() {
  const me = await getMe();

  const technicianId = me.data?.technicianProfile?.id;

  if (!technicianId) {
    return (
      <div className="mx-auto max-w-4xl">
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-between gap-4 py-10 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-medium">Complete your technician profile</p>
              <p className="text-sm text-muted-foreground">
                You need to set up your technician profile before you can add a
                service.
              </p>
            </div>

            <Button asChild>
              <Link href="/technician-dashboard/profile">Complete Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const result = await getAllCategories();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <CreateServiceForm categories={result.data ?? []} />
    </div>
  );
}
