import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default async function PaymentResultPage({
  searchParams,
}: {
  searchParams: Promise<{
    bookingId?: string;
    cancelled?: string;
  }>;
}) {
  const params = await searchParams;
  // If bookingId present and no cancelled flag → success
  const isSuccess = !!params.bookingId && params.cancelled !== "true";

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          {isSuccess ? (
            <>
              <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
              <CardTitle className="text-3xl">Payment Successful</CardTitle>
              <CardDescription>
                Thank you! Your payment has been completed successfully.
              </CardDescription>
            </>
          ) : (
            <>
              <XCircle className="mx-auto mb-4 h-16 w-16 text-red-600" />
              <CardTitle className="text-3xl">Payment Failed</CardTitle>
              <CardDescription>
                Your payment could not be completed. Please try again.
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/dashboard/my-bookings">My Bookings</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
