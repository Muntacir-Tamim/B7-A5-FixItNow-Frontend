"use client";

import { useState } from "react";
import {
  Bell,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { Switch } from "@/components/ui/switch";

import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CustomerSettingsPage() {
  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    paymentUpdates: true,
    serviceReminders: true,
    promotions: false,
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setSaving(false);
  };

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Settings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account, notifications, security, and preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:flex sm:w-fit">
            <TabsTrigger value="profile" className="gap-2 px-4 py-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>

            <TabsTrigger value="notifications" className="gap-2 px-4 py-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>

            <TabsTrigger value="security" className="gap-2 px-4 py-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          {/* ================= PROFILE ================= */}
          <TabsContent value="profile" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>

                <CardDescription>
                  Update the information associated with your FixItNow account.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-9 w-9 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-medium">Profile Picture</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Your profile picture helps technicians recognize you.
                    </p>

                    <Button variant="outline" size="sm" className="mt-3">
                      Change Picture
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>

                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      defaultValue=""
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>

                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      defaultValue=""
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-9"
                        defaultValue=""
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+880 1XXXXXXXXX"
                        className="pl-9"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <Textarea
                      id="address"
                      placeholder="Enter your service address"
                      className="min-h-[100px] pl-9"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>

                    <Input id="city" placeholder="Dhaka" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>

                    <Input id="district" placeholder="Dhaka" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />

                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>

                <CardDescription>
                  Choose which notifications you want to receive from FixItNow.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">Booking Updates</h3>

                      <p className="text-sm text-muted-foreground">
                        Receive updates when your booking is accepted, declined,
                        cancelled, or completed.
                      </p>
                    </div>

                    <Switch
                      checked={notifications.bookingUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          bookingUpdates: checked,
                        }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">Payment Updates</h3>

                      <p className="text-sm text-muted-foreground">
                        Get notified about payment confirmations and
                        payment-related updates.
                      </p>
                    </div>

                    <Switch
                      checked={notifications.paymentUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          paymentUpdates: checked,
                        }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">Service Reminders</h3>

                      <p className="text-sm text-muted-foreground">
                        Receive reminders about upcoming scheduled services.
                      </p>
                    </div>

                    <Switch
                      checked={notifications.serviceReminders}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          serviceReminders: checked,
                        }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">Promotions & Offers</h3>

                      <p className="text-sm text-muted-foreground">
                        Receive special offers, discounts, and promotional
                        updates.
                      </p>
                    </div>

                    <Switch
                      checked={notifications.promotions}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          promotions: checked,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6 space-y-6">
            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>

                <CardDescription>
                  Keep your account secure by using a strong password.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>

                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>

                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/40 p-4">
                  <p className="text-sm font-medium">Password requirements</p>

                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• At least 8 characters</li>
                    <li>• Include uppercase and lowercase letters</li>
                    <li>• Include at least one number</li>
                    <li>• Avoid using common passwords</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Lock className="h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>

                <CardDescription>
                  Additional information about the security of your account.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Email Verification</p>

                    <p className="text-sm text-muted-foreground">
                      Your email address is verified.
                    </p>
                  </div>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                    Verified
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>

                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account.
                    </p>
                  </div>

                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>

                <CardDescription>
                  Permanently remove your FixItNow account and associated data.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">Delete Account</p>

                    <p className="text-sm text-muted-foreground">
                      This action cannot be undone.
                    </p>
                  </div>

                  <Button variant="destructive" className="w-full sm:w-auto">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
