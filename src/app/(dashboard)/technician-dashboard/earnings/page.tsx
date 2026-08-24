import {
  BadgeDollarSign,
  Calendar,
  CheckCircle2,
  DollarSign,
  Wallet,
} from "lucide-react";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { getBookingsByTechnician } from "../../_actions/getAllBookingsByTechnician";
import { getMe } from "@/services/getMe";

interface TechnicianBooking {
  id: string;
  status: string;
  totalAmount: number;
  scheduledDate: string;
  scheduledTime: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
  };
  service?: {
    title: string;
    price: number;
  } | null;
  payment?: {
    id: string;
    amount: number;
    status: string;
    provider: string;
    transactionId: string | null;
    paidAt?: string | null;
    createdAt: string;
  } | null;
}

export default async function EarningsPage() {
  const meResult = await getMe();
  const technicianProfileId: string | undefined =
    meResult?.data?.technicianProfile?.id;

  const bookingResult = technicianProfileId
    ? await getBookingsByTechnician()
    : { success: false, data: [] };

  const bookings: TechnicianBooking[] = bookingResult?.data ?? [];

  const paidBookings = bookings.filter(
    (b) => b.payment?.status === "COMPLETED",
  );

  const totalEarnings = paidBookings.reduce(
    (sum, b) => sum + (b.payment?.amount ?? b.totalAmount),
    0,
  );

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const thisMonthEarnings = paidBookings
    .filter((b) => {
      const paidDate = new Date(b.payment?.paidAt ?? b.createdAt);
      return (
        paidDate.getMonth() === currentMonth &&
        paidDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, b) => sum + (b.payment?.amount ?? b.totalAmount), 0);

  const pendingPayout = bookings
    .filter(
      (b) =>
        b.status === "COMPLETED" &&
        (!b.payment || b.payment.status === "PENDING"),
    )
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const completedJobsCount = bookings.filter(
    (b) => b.status === "COMPLETED",
  ).length;

  const avgPerJob =
    paidBookings.length > 0
      ? Math.round(totalEarnings / paidBookings.length)
      : 0;

  const totalTransactions = paidBookings.length;

  const recentTransactions = [...paidBookings]
    .sort(
      (a, b) =>
        new Date(b.payment?.paidAt ?? b.createdAt).getTime() -
        new Date(a.payment?.paidAt ?? a.createdAt).getTime(),
    )
    .slice(0, 10);

  const stats = [
    {
      title: "Total Earnings",
      value: `$${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      description: "Lifetime earnings",
    },
    {
      title: "This Month",
      value: `$${thisMonthEarnings.toLocaleString()}`,
      icon: Calendar,
      color: "text-blue-600",
      description: `${now.toLocaleString("default", { month: "long" })} earnings`,
    },
    {
      title: "Pending Payout",
      value: `$${pendingPayout.toLocaleString()}`,
      icon: Wallet,
      color: "text-orange-500",
      description: "Completed jobs awaiting payment",
    },
    {
      title: "Completed Jobs",
      value: completedJobsCount.toString(),
      icon: CheckCircle2,
      color: "text-emerald-600",
      description: "Successfully completed",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>

        <p className="mt-2 text-muted-foreground">
          Monitor your income, completed jobs, and payment status.
        </p>
      </div>

      {!technicianProfileId && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row md:text-left">
            <div>
              <p className="font-medium">Complete your technician profile</p>
              <p className="text-sm text-muted-foreground">
                You need to set up your profile before earnings data can be
                shown here.
              </p>
            </div>

            <Button asChild>
              <Link href="/technician-dashboard/profile">Complete Profile</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </CardTitle>
                </div>

                <div className="rounded-lg bg-muted p-2">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold">{item.value}</div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Earnings Summary</CardTitle>

            <CardDescription>
              Overview of your financial performance.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border p-5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  Total Earned (Paid)
                </div>

                <p className="mt-3 text-3xl font-bold">
                  ${totalEarnings.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl border p-5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Wallet className="h-4 w-4 text-orange-500" />
                  Pending Payout
                </div>

                <p className="mt-3 text-3xl font-bold">
                  ${pendingPayout.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="rounded-xl border p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">
                    Total Lifetime Earnings
                  </p>

                  <p className="mt-2 text-4xl font-bold">
                    ${totalEarnings.toLocaleString()}
                  </p>
                </div>

                <BadgeDollarSign className="h-10 w-10 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Summary</CardTitle>

            <CardDescription>Current account status</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Transactions
              </p>

              <p className="mt-1 text-xl font-semibold">{totalTransactions}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Average Per Job</p>

              <p className="mt-1 text-xl font-semibold">
                ${avgPerJob.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">This Month</p>

              <p className="mt-1 text-xl font-semibold">
                ${thisMonthEarnings.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Completed Jobs</p>

              <p className="mt-1 text-xl font-semibold">{completedJobsCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>

          <CardDescription>
            Latest payments received from completed bookings.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {recentTransactions.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No completed payments yet.
            </p>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {booking.service?.title ?? "Service"}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {booking.customer.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(
                        booking.payment?.paidAt ?? booking.createdAt,
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold">
                      $
                      {(
                        booking.payment?.amount ?? booking.totalAmount
                      ).toLocaleString()}
                    </p>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {booking.payment?.provider ?? "STRIPE"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
