

import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
          <SearchX className="h-12 w-12 text-orange-500" />
        </div>

        <h1 className="text-7xl font-extrabold tracking-tight text-orange-500">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold tracking-tight">
          Page Not Found
        </h2>

        <p className="mt-4 text-muted-foreground">
          Sorry, the page you're looking for doesn't exist or may have been
          moved. Let's get you back to where you need to be.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Go to Home</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/services">Browse Services</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}