import Image from "next/image";
import {
  BadgeCheck,
  Briefcase,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Star,
  Wrench,
  DollarSign,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { getTechnicianById } from "../../_actions/getTechnicianById";

interface TechnicianDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Safe date formatter — avoids "Invalid Date" when value is null/undefined
function formatDate(value?: string | null): string {
  if (!value) return "N/A";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "N/A";
  return d.toLocaleDateString();
}

export default async function TechnicianDetailsPage({
  params,
}: TechnicianDetailsPageProps) {
  const { id } = await params;

  const result = await getTechnicianById(id);

  // Backend GET /api/technicians/:id returns technicianProfile object directly
  // Shape: { id, bio, profilePhoto, location, skills (string[]), user: { name, email }, ... }
  const profile = result?.data;

  if (!profile) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-2xl font-bold">Technician Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The technician profile you&apos;re looking for doesn&apos;t exist or
          has been removed.
        </p>
      </div>
    );
  }

  const techUser = profile?.user;
  const location =
    [profile?.city, profile?.district, profile?.address]
      .filter(Boolean)
      .join(", ") ||
    profile?.location ||
    null;

  // skills is a String[] in backend, not a comma-separated string
  const skillsArray: string[] = Array.isArray(profile?.skills)
    ? profile.skills
    : typeof profile?.skills === "string" && profile.skills
      ? (profile.skills as string).split(",").map((s: string) => s.trim())
      : [];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* ================= LEFT SIDEBAR ================= */}
        <Card className="h-fit">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center">
              <Image
                src={
                  profile?.profilePhoto ||
                  "https://placehold.co/300x300/png?text=Technician"
                }
                alt={techUser?.name ?? "Technician"}
                width={150}
                height={150}
                unoptimized
                className="h-36 w-36 rounded-full border object-cover"
              />

              <h1 className="mt-5 text-3xl font-bold">
                {techUser?.name ?? "Technician"}
              </h1>

              <p className="mt-1 text-muted-foreground">
                {profile?.profession || "Professional Technician"}
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {techUser?.status && (
                  <Badge>{techUser.status}</Badge>
                )}

                <Badge variant={profile?.isAvailable ? "default" : "secondary"}>
                  {profile?.isAvailable ? "Available" : "Unavailable"}
                </Badge>

                {profile?.isApproved ? (
                  <Badge className="bg-green-600 hover:bg-green-600">
                    Approved
                  </Badge>
                ) : (
                  <Badge variant="destructive">Not Approved</Badge>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>{techUser?.email ?? "—"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>{techUser?.phone ?? "—"}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{location || "Location not provided"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Joined {formatDate(profile?.createdAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="space-y-8 lg:col-span-2">
          {/* ================= STATS ================= */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Briefcase className="h-8 w-8 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>

                  <h3 className="text-2xl font-bold">
                    {profile?.yearsOfExperience
                      ? `${profile.yearsOfExperience} Years`
                      : "N/A"}
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />

                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>

                  <h3 className="text-2xl font-bold">
                    {profile?.averageRating ?? 0}
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <BadgeCheck className="h-8 w-8 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">Jobs Done</p>

                  <h3 className="text-2xl font-bold">
                    {profile?._count?.bookings ??
                      profile?.totalCompletedJobs ??
                      0}
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Clock3 className="h-8 w-8 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>

                  <h3 className="text-2xl font-bold">
                    {profile?.responseTime
                      ? `${profile.responseTime} min`
                      : "N/A"}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ================= ABOUT ================= */}
          <Card>
            <CardContent className="p-8">
              <h2 className="mb-5 text-2xl font-bold">About</h2>

              <p className="leading-8 text-muted-foreground">
                {profile?.bio || "This technician hasn't added a bio yet."}
              </p>

              {profile?.description && (
                <>
                  <Separator className="my-6" />
                  <p className="leading-8 text-muted-foreground">
                    {profile.description}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* ================= SKILLS ================= */}
          <Card>
            <CardContent className="p-8">
              <h2 className="mb-5 text-2xl font-bold">Skills</h2>

              {skillsArray.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {skillsArray.map((skill: string) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-4 py-2"
                    >
                      <Wrench className="mr-2 h-4 w-4" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No skills added yet.</p>
              )}
            </CardContent>
          </Card>

          {/* ================= DETAILS ================= */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="space-y-5 p-6">
                <h2 className="text-xl font-semibold">Professional Details</h2>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profession</span>

                  <span className="font-medium">
                    {profile?.profession || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reviews</span>

                  <span className="font-medium">
                    {profile?.totalReviews ?? 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">User ID</span>

                  <span className="max-w-[170px] truncate text-right text-sm">
                    {profile?.userId}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profile ID</span>

                  <span className="max-w-[170px] truncate text-right text-sm">
                    {profile?.id}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-5 p-6">
                <h2 className="text-xl font-semibold">Account Status</h2>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Availability</span>

                  {profile?.isAvailable ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-5 w-5" />
                      Available
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500">
                      <XCircle className="h-5 w-5" />
                      Unavailable
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Approval</span>

                  {profile?.isApproved ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-5 w-5" />
                      Approved
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-orange-500">
                      <XCircle className="h-5 w-5" />
                      Pending
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{formatDate(profile?.createdAt)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span>{formatDate(profile?.updatedAt)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ================= PRICING ================= */}
          <Card>
            <CardContent className="flex flex-col items-center justify-between gap-6 p-8 md:flex-row">
              <div className="flex items-center gap-4">
                <DollarSign className="h-12 w-12 text-primary" />

                <div>
                  <h2 className="text-2xl font-bold">Hourly Rate</h2>

                  <p className="text-muted-foreground">
                    Professional service with transparent pricing.
                  </p>
                </div>
              </div>

              <h3 className="text-4xl font-bold text-primary">
                {profile?.hourlyRate ? `৳${profile.hourlyRate}/hr` : "Not Set"}
              </h3>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
