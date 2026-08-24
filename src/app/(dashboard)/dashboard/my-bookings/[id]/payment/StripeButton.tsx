"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/app/(dashboard)/_actions/createPayment";

interface StripeButtonProps {
  bookingId: string;
  amount: number;
}

export default function StripeButton({ bookingId }: StripeButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handlePayment = () => {
    startTransition(async () => {
      try {
        const result = await createCheckoutSession(bookingId);

        if (!result.success) {
          toast.error(result.message || "Failed to create checkout session.");
          return;
        }

        if (!result.data?.paymentUrl) {
          toast.error("Checkout URL not found. Please try again.");
          return;
        }

        window.location.assign(result.data.paymentUrl);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <Button onClick={handlePayment} disabled={isPending} className="w-full">
      {isPending ? "Redirecting to Stripe..." : "Pay with Stripe"}
    </Button>
  );
}
