"use client";

import { Button } from "@/components/ui/button";
import { createPayment } from "@/app/(dashboard)/_actions/createPayment";
import { useTransition } from "react";
import { toast } from "sonner";

interface SSLCommerzButtonProps {
  bookingId: string;
  amount: number;
}

export default function SSLCommerzButton({ bookingId }: SSLCommerzButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handlePayment = () => {
    startTransition(async () => {
      const result = await createPayment({
        bookingId,
        provider: "SSLCOMMERZ",
      });

      if (!result.success) {
        toast.error(result.message || "Failed to initiate payment.");
        return;
      }

      if (result.data?.paymentUrl) {
        window.location.href = result.data.paymentUrl;
      } else {
        toast.error("Payment URL not found. Please try again.");
      }
    });
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={isPending}
      onClick={handlePayment}
    >
      {isPending ? "Redirecting..." : "Pay with SSLCommerz"}
    </Button>
  );
}
