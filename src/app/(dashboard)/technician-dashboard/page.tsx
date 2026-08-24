import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  Star,
  Wrench,
} from "lucide-react";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBookingsByTechnician } from "../_actions/getAllBookingsByTechnician";
import { getTechnicianById } from "../_actions/getTechnicianById";
import { getMe } from "@/services/getMe";

function getStatusVariant(
  status: string,
): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "REQUESTED":
    case "ACCEPTED":
      return "secondary";
    case "DECLINED":
    case "CANCELLED":
      return "destructive";
    default:
      return "outline";
  }
}

export default async function TechnicianDashboardPage() {
  // Fetch current logged-in user
  const meResult = await getMe();
  const technicianProfileId: string | undefined =
    meResult?.data?.technicianProfile?.id;

  const bookingResult = technicianProfileId
    ? await getBookingsByTechnician()
    : { success: false, data: [] };

  const bookings: {
    id: string;
    status: string;
    totalAmount: number;
    scheduledDate: string;
    scheduledTime: string;
    createdAt: string;
    customer: { name: string; email: string };
    service?: { title: string; price: number } | null;
    payment?: { status: string } | null;
  }[] = bookingResult?.data ?? [];

  let avgRating: number | null = null;
  let totalReviews = 0;

  if (technicianProfileId) {
    const profileResult = await getTechnicianById(technicianProfileId);
    const completedBookings: {
      review?: { rating: number } | null;
    }[] = profileResult?.data?.bookings ?? [];

    const ratingsArr = completedBookings
      .map((b) => b.review?.rating)
      .filter((r): r is number => r !== null && r !== undefined);

    if (ratingsArr.length > 0) {
      avgRating =
        Math.round(
          (ratingsArr.reduce((a, b) => a + b, 0) / ratingsArr.length) * 10,
        ) / 10;
      totalReviews = ratingsArr.length;
    }
  }

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (b) => b.status === "REQUESTED",
  ).length;
  const todaysJobs = bookings.filter((b) => {
    const bookingDate = new Date(b.scheduledDate).toDateString();
    const today = new Date().toDateString();
    return bookingDate === today && b.status !== "CANCELLED";
  }).length;
  const completedJobs = bookings.filter((b) => b.status === "COMPLETED").length;
  const totalEarnings = bookings
    .filter((b) => b.payment?.status === "COMPLETED")
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: CalendarDays,
      description: "All time bookings",
    },
    {
      title: "Pending Requests",
      value: pendingBookings,
      icon: Clock3,
      description: "Awaiting response",
    },
    {
      title: "Today's Jobs",
      value: todaysJobs,
      icon: Wrench,
      description: "Scheduled today",
    },
    {
      title: "Completed Jobs",
      value: completedJobs,
      icon: CheckCircle2,
      description: "Successfully finished",
    },
    {
      title: "Average Rating",
      value: avgRating !== null ? avgRating.toFixed(1) : "—",
      icon: Star,
      description:
        totalReviews > 0
          ? `Based on ${totalReviews} reviews`
          : "No reviews yet",
    },
    {
      title: "Total Earnings",
      value: `$${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      description: "From completed payments",
    },
  ];

  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const now = new Date();
  const upcomingJobs = bookings
    .filter(
      (b) =>
        (b.status === "ACCEPTED" || b.status === "PAID") &&
        new Date(b.scheduledDate) >= now,
    )
    .sort(
      (a, b) =>
        new Date(a.scheduledDate).getTime() -
        new Date(b.scheduledDate).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Technician Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your work.
        </p>
      </div>

      {!technicianProfileId && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-medium">Complete your technician profile</p>
              <p className="text-sm text-muted-foreground">
                You need to set up your profile before you can receive bookings
                or view earnings.
              </p>
            </div>

            <Button asChild>
              <Link href="/technician-dashboard/profile">Complete Profile</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>

                <Icon className="h-5 w-5 text-muted-foreground" />
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
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>

            <CardDescription>Your latest booking requests.</CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentBookings.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No bookings found.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.customer.name}</TableCell>

                      <TableCell>{booking.service?.title ?? "—"}</TableCell>

                      <TableCell>
                        {new Date(booking.scheduledDate).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        <Badge variant={getStatusVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Jobs</CardTitle>

            <CardDescription>
              Accepted or paid jobs scheduled in the future.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {upcomingJobs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No upcoming jobs.
                    </TableCell>
                  </TableRow>
                ) : (
                  upcomingJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.customer.name}</TableCell>

                      <TableCell>{job.service?.title ?? "—"}</TableCell>

                      <TableCell>{job.scheduledTime}</TableCell>

                      <TableCell>
                        {new Date(job.scheduledDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                          },
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
