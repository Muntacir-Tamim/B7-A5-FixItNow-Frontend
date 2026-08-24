"use client";

import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingStatusChartProps {
  data?: {
    name: string;
    value: number;
    color: string;
  }[];
}

export default function BookingStatusChart({
  data = [],
}: BookingStatusChartProps) {
  const hasData = data.some((d) => d.value > 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Booking Status Overview</CardTitle>
      </CardHeader>

      <CardContent className="flex h-[290px] items-center justify-center text-muted-foreground">
        {!hasData ? (
          <p className="text-sm">No booking data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.filter((d) => d.value > 0)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={3}
                strokeWidth={2}
              >
                {data
                  .filter((d) => d.value > 0)
                  .map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => [`${value} bookings`, name]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  backgroundColor: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                }}
              />

              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
