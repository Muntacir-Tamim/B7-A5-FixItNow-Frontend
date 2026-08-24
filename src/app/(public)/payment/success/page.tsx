import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
          <CardTitle className="text-3xl">Payment Successful</CardTitle>
          <CardDescription>
            Thank you! Your payment has been completed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          {params.bookingId ? (
            <Button asChild>
              <Link href={`/dashboard/my-bookings/${params.bookingId}`}>
                View Booking
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
