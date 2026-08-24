import Image from "next/image";
import Link from "next/link";

import { getMe } from "@/services/getMe";
import { getTechnicianById } from "../../_actions/getTechnicianById";
import { getTechnicianServices } from "../../_actions/getTechnicianServices";

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

import { Clock, Plus, Pencil, CalendarDays } from "lucide-react";
import DeleteServiceButton from "../../_components/DeleteServiceButton";

export interface TechnicianService {
  id: string;
  technicianProfileId: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  location?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
}

export default async function TechnicianServicesPage() {
  const me = await getMe();

  const technicianId = me.data?.technicianProfile?.id;

  if (!technicianId) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-between gap-4 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-medium">Complete your technician profile</p>
            <p className="text-sm text-muted-foreground">
              You need to set up your technician profile before you can add or
              manage services.
            </p>
          </div>

          <Button asChild>
            <Link href="/technician-dashboard/profile">Complete Profile</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const technician = await getTechnicianById(technicianId);
  const response = await getTechnicianServices(technicianId);

  const services: TechnicianService[] = response?.data ?? [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Services</h1>
          <p className="text-muted-foreground">Manage your offered services.</p>
        </div>

        <Button asChild>
          <Link href="/technician-dashboard/services/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{technician?.data?.user?.name ?? "Technician"}</CardTitle>
          <CardDescription>{technician?.data?.bio ?? ""}</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Total Services</p>
            <p className="text-2xl font-bold">{services.length}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Experience</p>
            <p className="text-2xl font-bold">
              {technician?.data?.experience ?? 0} yrs
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="text-2xl font-bold">
              {technician?.data?.location ?? "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>All services you currently provide.</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center h-32 text-muted-foreground"
                  >
                    No services found. Click &quot;Add Service&quot; to create
                    your first service.
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service: TechnicianService) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{service.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {service.description}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">
                        {service.category?.name ?? "—"}
                      </Badge>
                    </TableCell>

                    <TableCell>৳{service.price}</TableCell>

                    <TableCell>{service.location ?? "—"}</TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          service.status === "ACTIVE"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {service.status === "ACTIVE" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link
                            href={`/technician-dashboard/services/${service.id}/slots`}
                          >
                            <CalendarDays className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button variant="outline" size="icon" asChild>
                          <Link
                            href={`/technician-dashboard/services/${service.id}/edit`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>

                        <DeleteServiceButton serviceId={service.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
