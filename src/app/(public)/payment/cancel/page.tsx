import Link from "next/link";
import { XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <XCircle className="mx-auto mb-4 h-16 w-16 text-red-600" />
          <CardTitle className="text-3xl">Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment was not completed. No charges were made.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          {params.bookingId ? (
            <Button asChild>
              <Link href={`/dashboard/my-bookings/${params.bookingId}/payment`}>
                Try Again
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/dashboard/my-bookings">My Bookings</Link>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/">Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
