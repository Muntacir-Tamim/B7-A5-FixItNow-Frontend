import { getMe } from "@/services/getMe";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Phone,
  Shield,
  CalendarDays,
  User,
  Fingerprint,
} from "lucide-react";

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-medium">{value ?? "—"}</span>
    </div>
  );
}

export default async function CustomerProfilePage() {
  const result = await getMe();

  const profile = result?.data;

  if (!profile) {
    return (
      <div className="flex h-60 items-center justify-center text-muted-foreground">
        Could not load profile. Please log in again.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-8 sm:flex-row sm:items-start">
          <Avatar className="h-20 w-20 text-2xl">
            <AvatarFallback>
              {profile.name?.charAt(0)?.toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.email}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge>{profile.role}</Badge>
              <Badge
                variant={
                  profile.status === "ACTIVE" ? "outline" : "destructive"
                }
              >
                {profile.status}
              </Badge>
              {profile.isVerified && (
                <Badge variant="secondary">Verified</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Information
          </CardTitle>
          <CardDescription>Your personal account details.</CardDescription>
        </CardHeader>

        <CardContent className="divide-y">
          <InfoRow label="Full Name" value={profile.name} />
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Phone" value={profile.phone} />
          <InfoRow label="Role" value={profile.role} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Account Status
          </CardTitle>
        </CardHeader>

        <CardContent className="divide-y">
          <div className="flex items-center justify-between py-3">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              Email Verified
            </span>
            <Badge variant={profile.isVerified ? "outline" : "secondary"}>
              {profile.isVerified ? "Verified" : "Not verified"}
            </Badge>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Fingerprint className="h-4 w-4" />
              Account Status
            </span>
            <Badge
              variant={profile.status === "ACTIVE" ? "outline" : "destructive"}
            >
              {profile.status}
            </Badge>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              Member Since
            </span>
            <span className="font-medium">
              {new Date(profile.createdAt).toLocaleDateString()}
            </span>
          </div>

          {profile.phone && (
            <div className="flex items-center justify-between py-3">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                Phone
              </span>
              <span className="font-medium">{profile.phone}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
