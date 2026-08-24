import { getMe } from "@/services/getMe";
import Link from "next/link";
import UpdateTechnicianProfileForm from "./UpdateTechnicianProfileForm";

export default async function EditTechnicianProfilePage() {
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 bg-card border border-border rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            No profile found
          </h2>
          <p className="text-muted-foreground mt-2">
            You need to create a technician profile first.
          </p>
          <Link
            href="/technician-dashboard/profile"
            className="inline-block mt-4 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <UpdateTechnicianProfileForm
      initialData={{
        bio: tech.bio ?? "",
        skills: tech.skills ?? [],
        experience: tech.experience ?? undefined,
        location: tech.location ?? "",
        profilePhoto: tech.profilePhoto ?? "",
      }}
    />
  );
}
