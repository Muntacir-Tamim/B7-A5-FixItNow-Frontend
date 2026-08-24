import { getMe } from "@/services/getMe";
import Image from "next/image";
import Link from "next/link";
import CreateTechnicianProfileForm from "./CreateTechnicianProfileForm";

export default async function TechnicianProfilePage() {
  const result = await getMe();

  if (!result?.success || !result?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 bg-card border border-border rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Failed to load profile
          </h2>
          <p className="text-muted-foreground mt-2">
            {result?.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  const user = result.data;
  const tech = user.technicianProfile;

  if (!tech) {
    return <CreateTechnicianProfileForm />;
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/80 to-primary/10 h-32" />

          <div className="px-6 pb-6 -mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6">
              {/* Profile Photo */}
              <div className="relative w-32 h-32">
                <Image
                  src={
                    tech.profilePhoto ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(user.name) +
                      "&size=128&background=random"
                  }
                  alt={user.name}
                  fill
                  className="w-32 h-32 rounded-full border-4 border-card object-cover shadow-md bg-muted"
                  priority
                />
                {tech.isVerified && (
                  <span
                    title="Verified"
                    className="absolute bottom-2 right-2 w-5 h-5 bg-blue-500 border-2 border-card rounded-full flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-3 h-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>

              {/* Name + Info */}
              <div className="flex-1 pt-4 sm:pt-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground">
                    {user.name}
                  </h1>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "ACTIVE"
                        ? "bg-green-500/15 text-green-600 dark:text-green-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {user.status}
                  </span>

                  {tech.isVerified ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-700 dark:text-blue-400">
                      Verified
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/15 text-yellow-700 dark:text-yellow-400">
                      Not Verified
                    </span>
                  )}
                </div>

                {tech.location && (
                  <p className="text-sm text-muted-foreground mt-1">
                    📍 {tech.location}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="text-2xl font-bold text-primary">
                    {tech.experience} yrs
                  </p>
                </div>

                <Link
                  href="/technician-dashboard/profile/edit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {/* Left */}
          <div className="md:col-span-2 space-y-6">
            {tech.bio && (
              <Card title="About">
                <p className="text-foreground/90 leading-relaxed">{tech.bio}</p>
              </Card>
            )}

            {tech.skills && tech.skills.length > 0 && (
              <Card title="Skills">
                <div className="flex flex-wrap gap-2">
                  {tech.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {tech.availability && tech.availability.length > 0 && (
              <Card title="Availability">
                <div className="space-y-2">
                  {tech.availability.map(
                    (slot: {
                      id: string;
                      day: string;
                      startTime: string;
                      endTime: string;
                    }) => (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between py-2 border-b border-border last:border-0"
                      >
                        <span className="font-medium text-sm capitalize">
                          {slot.day.charAt(0) + slot.day.slice(1).toLowerCase()}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {slot.startTime} – {slot.endTime}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card title="Contact Information">
              <div className="space-y-3 text-sm">
                <InfoRow label="Name" value={user.name} />
                <InfoRow label="Email" value={user.email} />
                {user.phone && <InfoRow label="Phone" value={user.phone} />}
                {user.address && (
                  <InfoRow label="Address" value={user.address} />
                )}
                {tech.location && (
                  <InfoRow label="Location" value={tech.location} />
                )}
              </div>
            </Card>

            <Card title="Account">
              <div className="space-y-3 text-sm">
                <InfoRow label="Role" value={user.role} />
                <InfoRow
                  label="Verified"
                  value={
                    <span
                      className={
                        tech.isVerified
                          ? "text-blue-600 dark:text-blue-400 font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {tech.isVerified ? "Yes ✓" : "No"}
                    </span>
                  }
                />
                <InfoRow
                  label="Joined"
                  value={new Date(user.createdAt).toLocaleDateString()}
                />
              </div>
            </Card>

            <Card title="Quick Links">
              <div className="space-y-2">
                <Link
                  href="/technician-dashboard/availability"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  📅 Manage Availability
                </Link>
                <Link
                  href="/technician-dashboard/services"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  🔧 My Services
                </Link>
                <Link
                  href="/technician-dashboard/bookings"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  📋 My Bookings
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium text-right">{value}</span>
    </div>
  );
}
