import { Suspense } from "react";

import { ServicesSkeleton } from "./_components/ServicesSkeleton";
import { ServicesList } from "./_components/ServicesList";
import ServicesSearchBar from "./_components/ServicesSearchBar";
import Pagination from "./_components/Pagination";
import ServiceFilters from "./_components/ServiceFilters";
import { getAllCategories } from "../_actions/getAllCategories";

interface ServicesPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const Services = async ({ searchParams }: ServicesPageProps) => {
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Services</h1>

        <p className="mt-2 text-muted-foreground">Here are all our services.</p>
      </div>

      {/* Main Layout */}
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* LEFT - Filters */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Suspense fallback={null}>
            <ServiceFilters categories={categories.data} />
          </Suspense>
        </aside>

        {/* RIGHT - Services */}
        <main className="min-w-0">
          {/* Search */}
          <div className="mb-6 flex justify-end">
            <ServicesSearchBar />
          </div>

          {/* Services List */}
          <Suspense fallback={<ServicesSkeleton />}>
            <ServicesList searchParams={searchParams} />
          </Suspense>

          {/* Pagination */}
          <div className="mt-8">
            <Pagination searchParams={searchParams} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Services;

// Public services listing: displays all available services for customers to browse and book.
