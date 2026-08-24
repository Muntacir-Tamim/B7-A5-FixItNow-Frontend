import {
  Users,
  Wrench,
  CalendarCheck,
  DollarSign,
  Activity,
  Clock3,
  TrendingUp,
  UserCheck,
} from "lucide-react";

import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingStatusChart from "../_components/BookingStatusChart";
import RevenueLineChart from "../_components/RevenueLineChart";

async function getDashboardStats() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );

    const result = await res.json();
    if (!res.ok) return null;
    return result.data;
  } catch {
    return null;
  }
}

async function getRecentData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const [bookingsRes, usersRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings?limit=3`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?limit=3`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }),
    ]);

    const bookings = bookingsRes.ok
      ? ((await bookingsRes.json()).data ?? [])
      : [];
    const users = usersRes.ok ? ((await usersRes.json()).data ?? []) : [];

    return { bookings, users };
  } catch {
    return { bookings: [], users: [] };
  }
}

export default async function AdminDashboardHome() {
  const [stats, recentData] = await Promise.all([
    getDashboardStats(),
    getRecentData(),
  ]);

  const { bookings: recentBookings, users: recentUsers } = recentData;

  const chartData = [
    {
      name: "Completed",
      value: stats?.totalCompletedBookings ?? 0,
      color: "#22c55e",
    },
    {
      name: "Pending",
      value: stats?.totalPendingBookings ?? 0,
      color: "#eab308",
    },
    {
      name: "Other",
      value: Math.max(
        (stats?.totalBookings ?? 0) -
          (stats?.totalCompletedBookings ?? 0) -
          (stats?.totalPendingBookings ?? 0),
        0,
      ),
      color: "#94a3b8",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor users, bookings, services and platform performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <h2 className="text-3xl font-bold">{stats?.totalUsers ?? "—"}</h2>
            </div>
            <Users className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <h2 className="text-3xl font-bold">
                {stats?.totalBookings ?? "—"}
              </h2>
            </div>
            <CalendarCheck className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Active Services</p>
              <h2 className="text-3xl font-bold">
                {stats?.totalServices ?? "—"}
              </h2>
            </div>
            <Wrench className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h2 className="text-3xl font-bold">
                {stats?.totalRevenue != null
                  ? `$${Number(stats.totalRevenue).toLocaleString()}`
                  : "—"}
              </h2>
            </div>
            <DollarSign className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BookingStatusChart data={chartData} />
        <RevenueLineChart data={stats?.monthlyRevenue ?? []} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Latest Bookings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBookings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No bookings yet.</p>
            ) : (
              recentBookings.map(
                (booking: {
                  id: string;
                  service?: { title: string } | null;
                  customer?: { name: string } | null;
                  technicianProfile?: { user: { name: string } } | null;
                  status: string;
                }) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {booking.service?.title ?? "Unknown Service"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.customer?.name ?? "?"} →{" "}
                        {booking.technicianProfile?.user?.name ?? "?"}
                      </p>
                    </div>
                    <Clock3 className="h-5 w-5 text-muted-foreground" />
                  </div>
                ),
              )
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No users yet.</p>
            ) : (
              recentUsers.map(
                (user: {
                  id: string;
                  name: string;
                  role: string;
                  createdAt: string;
                }) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <UserCheck className="text-primary" />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.role.charAt(0) + user.role.slice(1).toLowerCase()}{" "}
                        • Joined{" "}
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ),
              )
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Active Technicians
              </p>
              <h2 className="text-2xl font-bold">
                {stats?.totalTechnicians ?? "—"}
              </h2>
            </div>
            <Activity className="h-9 w-9 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Booking Success Rate
              </p>
              <h2 className="text-2xl font-bold">
                {stats?.totalBookings
                  ? `${Math.round((stats.totalCompletedBookings / stats.totalBookings) * 100)}%`
                  : "—"}
              </h2>
            </div>
            <TrendingUp className="h-9 w-9 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Pending Bookings</p>
              <h2 className="text-2xl font-bold">
                {stats?.totalPendingBookings ?? "—"}
              </h2>
            </div>
            <UserCheck className="h-9 w-9 text-primary" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
