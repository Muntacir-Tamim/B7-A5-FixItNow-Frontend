import {
  Users,
  Wrench,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  Activity,
  Briefcase,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DashboardStats {
  totalUsers: number;
  totalCustomers: number;
  totalTechnicians: number;
  totalBookings: number;
  totalCompletedBookings: number;
  totalPendingBookings: number;
  totalRevenue: number;
  totalServices: number;
  totalCategories: number;
}

interface Booking {
  id: string;
  status: string;
  createdAt: string;
  service?: { title: string; category?: { name: string } } | null;
  customer?: { name: string } | null;
  technicianProfile?: { user: { name: string } } | null;
  payment?: { amount: number } | null;
}

interface User {
  id: string;
  name: string;
  role: string;
  createdAt: string;
}

async function getAnalyticsData(): Promise<{
  stats: DashboardStats | null;
  recentBookings: Booking[];
  recentUsers: User[];
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const headers = { Authorization: `Bearer ${token}` };
    const opts = { headers, cache: "no-store" as const };

    const [statsRes, bookingsRes, usersRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, opts),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings?limit=50`,
        opts,
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?limit=10`,
        opts,
      ),
    ]);

    const stats: DashboardStats | null = statsRes.ok
      ? ((await statsRes.json()).data ?? null)
      : null;

    const recentBookings: Booking[] = bookingsRes.ok
      ? ((await bookingsRes.json()).data ?? [])
      : [];

    const recentUsers: User[] = usersRes.ok
      ? ((await usersRes.json()).data ?? [])
      : [];

    return { stats, recentBookings, recentUsers };
  } catch {
    return { stats: null, recentBookings: [], recentUsers: [] };
  }
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function pct(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

export default async function AnalyticsAdminPage() {
  const { stats, recentBookings, recentUsers } = await getAnalyticsData();

  const otherBookings = Math.max(
    (stats?.totalBookings ?? 0) -
      (stats?.totalCompletedBookings ?? 0) -
      (stats?.totalPendingBookings ?? 0),
    0,
  );

  const completionRate = pct(
    stats?.totalCompletedBookings ?? 0,
    stats?.totalBookings ?? 0,
  );

  const technicianRate = pct(
    stats?.totalTechnicians ?? 0,
    stats?.totalUsers ?? 0,
  );

  const serviceCounts: Record<string, { bookings: number; revenue: number }> =
    {};
  for (const b of recentBookings) {
    const name = b.service?.title ?? "Unknown";
    if (!serviceCounts[name]) serviceCounts[name] = { bookings: 0, revenue: 0 };
    serviceCounts[name].bookings += 1;
    if (b.payment?.amount)
      serviceCounts[name].revenue += Number(b.payment.amount);
  }
  const topServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1].bookings - a[1].bookings)
    .slice(0, 5)
    .map(([name, data]) => ({
      name,
      bookings: data.bookings,
      revenue: `$${data.revenue.toLocaleString()}`,
    }));

  const activityFeed = [
    ...recentBookings.slice(0, 4).map((b) => ({
      action:
        b.status === "COMPLETED"
          ? "Booking completed"
          : b.status === "REQUESTED"
            ? "New booking requested"
            : `Booking ${b.status.toLowerCase()}`,
      user: b.customer?.name ?? "Unknown",
      time: new Date(b.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    })),
    ...recentUsers.slice(0, 2).map((u) => ({
      action: `New ${u.role.toLowerCase()} registered`,
      user: u.name,
      time: new Date(u.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    })),
  ].slice(0, 5);

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers?.toLocaleString() ?? "—",
      sub: `${stats?.totalCustomers?.toLocaleString() ?? "—"} customers`,
      icon: Users,
    },
    {
      title: "Active Technicians",
      value: stats?.totalTechnicians?.toLocaleString() ?? "—",
      sub: `${technicianRate}% of users`,
      icon: Wrench,
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings?.toLocaleString() ?? "—",
      sub: `${stats?.totalCompletedBookings ?? "—"} completed`,
      icon: CalendarCheck,
    },
    {
      title: "Platform Revenue",
      value:
        stats?.totalRevenue != null
          ? `$${Number(stats.totalRevenue).toLocaleString()}`
          : "—",
      sub: "Commission earned",
      icon: DollarSign,
    },
  ];

  const healthMetrics = [
    {
      label: "Booking Completion Rate",
      value: completionRate,
    },
    {
      label: "Technician Ratio",
      value: technicianRate,
    },
    {
      label: "Active Services",
      value: pct(stats?.totalServices ?? 0, stats?.totalCategories || 1),
      display: `${stats?.totalServices ?? "—"} services / ${stats?.totalCategories ?? "—"} categories`,
    },
    {
      label: "Pending Resolution",
      value: pct(stats?.totalPendingBookings ?? 0, stats?.totalBookings ?? 0),
    },
  ];

  const statusBreakdown = [
    {
      label: "Completed",
      count: stats?.totalCompletedBookings ?? 0,
      color: "text-emerald-600",
      icon: CheckCircle2,
    },
    {
      label: "Pending",
      count: stats?.totalPendingBookings ?? 0,
      color: "text-yellow-600",
      icon: Clock,
    },
    {
      label: "Other",
      count: otherBookings,
      color: "text-slate-500",
      icon: XCircle,
    },
  ];

  return (
    <div className="space-y-8 p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Live platform performance overview for FixItNow
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="rounded-lg bg-primary/10 p-2">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Bookings Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-around pt-4">
              {statusBreakdown.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2">
                  <s.icon className={`h-8 w-8 ${s.color}`} />
                  <span className="text-2xl font-bold">{s.count}</span>
                  <Badge variant="secondary" className="text-xs">
                    {s.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {pct(s.count, stats?.totalBookings ?? 0)}% of total
                  </span>
                </div>
              ))}
            </div>

            {stats?.totalBookings ? (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Booking distribution
                </p>
                <div className="flex h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="bg-emerald-500 transition-all"
                    style={{
                      width: `${pct(stats.totalCompletedBookings, stats.totalBookings)}%`,
                    }}
                  />
                  <div
                    className="bg-yellow-400 transition-all"
                    style={{
                      width: `${pct(stats.totalPendingBookings, stats.totalBookings)}%`,
                    }}
                  />
                  <div className="flex-1 bg-slate-300 dark:bg-slate-600" />
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    Completed
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-yellow-400" />
                    Pending
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-slate-400" />
                    Other
                  </span>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Top Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topServices.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No booking data yet.
              </p>
            ) : (
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{service.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {service.bookings} bookings
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">
                      {service.revenue}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity + Platform Health */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activityFeed.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No recent activity.
              </p>
            ) : (
              <div className="space-y-4">
                {activityFeed.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.user}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Platform Health */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {healthMetrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="font-medium">
                    {metric.display ?? `${metric.value}%`}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${Math.min(metric.value, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            User Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                label: "Total Users",
                value: stats?.totalUsers ?? "—",
                color: "bg-primary/10 text-primary",
              },
              {
                label: "Customers",
                value: stats?.totalCustomers ?? "—",
                color: "bg-blue-500/10 text-blue-600",
              },
              {
                label: "Technicians",
                value: stats?.totalTechnicians ?? "—",
                color: "bg-emerald-500/10 text-emerald-600",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex flex-col items-center justify-center rounded-xl p-6 ${item.color}`}
              >
                <span className="text-3xl font-bold">{item.value}</span>
                <span className="mt-1 text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
