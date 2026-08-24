import Link from "next/link";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function BookingSuccessPage() {
  return (
    <div className="container flex min-h-[80vh] items-center justify-center py-10">
      <Card className="w-full max-w-2xl border-green-200 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>

          <CardTitle className="text-3xl font-bold text-green-700">
            Booking Submitted Successfully!
          </CardTitle>

          <CardDescription className="mt-2 text-base">
            Your booking request has been sent to the technician.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/40 p-5">
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 text-orange-500" />

              <div>
                <h3 className="font-semibold">
                  Waiting for Technician Acceptance
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  The technician will review your booking request and either
                  accept or decline it. You'll be able to track the latest
                  status from your booking dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-dashed p-5">
            <h4 className="mb-3 font-semibold">What happens next?</h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✅ Your booking request has been created.</li>
              <li>📨 The technician has been notified.</li>
              <li>⏳ Please wait for the technician's response.</li>
              <li>🔔 You'll see updates on your Bookings page.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/dashboard/bookings">
                View My Bookings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" className="flex-1">
              <Link href="/services">
                Browse More Services
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}