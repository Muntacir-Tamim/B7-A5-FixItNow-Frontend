import { Suspense } from "react";

import ServicesSearchBar from "@/app/(public)/services/_components/ServicesSearchBar";
import { ServicesListAdminPage } from "@/app/(public)/_components/serviceListAdminpage";

const Services = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">All Services</h1>
          <p className="text-sm text-muted-foreground">
            Manage and oversee every service offered on the platform.
          </p>
        </div>

        <ServicesSearchBar />
      </div>
      <Suspense fallback={"Loading..."}>
        <ServicesListAdminPage searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Services;
