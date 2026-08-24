import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  Wrench,
  CheckCircle2,
  CreditCard,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TodayDate from "../_components/TodayDate";
import { getMe } from "@/services/getMe";
import { getMyBookings } from "../_actions/getMyBookings";

export default async function CustomerDashboardHome() {
  const [userResult, bookingsResult] = await Promise.all([
    getMe(),
    getMyBookings(),
  ]);

  const userName = userResult?.data?.name ?? "there";
  const bookings = bookingsResult?.data || [];

  const stats = {
    total: bookings.length,
    pending: bookings.filter(
      (b: { status: string }) => b.status === "REQUESTED",
    ).length,
    inProgress: bookings.filter(
      (b: { status: string }) => b.status === "IN_PROGRESS",
    ).length,
    completed: bookings.filter(
      (b: { status: string }) => b.status === "COMPLETED",
    ).length,
    totalSpent: bookings
      .filter((b: { status: string }) =>
        ["PAID", "IN_PROGRESS", "COMPLETED"].includes(b.status),
      )
      .reduce(
        (sum: number, b: { totalAmount?: number }) =>
          sum + (b.totalAmount || 0),
        0,
      ),
    reviews: bookings.filter((b: { review?: unknown }) => b.review != null)
      .length,
  };

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.total,
      description: "All time",
      icon: CalendarDays,
    },
    {
      title: "Pending",
      value: stats.pending,
      description: "Awaiting confirmation",
      icon: Clock3,
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      description: "Currently active",
      icon: Wrench,
    },
    {
      title: "Completed",
      value: stats.completed,
      description: "Finished jobs",
      icon: CheckCircle2,
    },
    {
      title: "Total Spent",
      value: `$${stats.totalSpent.toFixed(2)}`,
      description: "Lifetime",
      icon: CreditCard,
    },
    {
      title: "Reviews Given",
      value: stats.reviews,
      description: "Submitted",
      icon: Star,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {userName} 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            <TodayDate />
          </p>
        </div>
        <Button asChild>
          <Link href="/services">
            Browse Services <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardDescription>{stat.title}</CardDescription>
                  <CardTitle className="mt-2 text-3xl">{stat.value}</CardTitle>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// Customer dashboard: view bookings, payments, reviews, and profile settings.
