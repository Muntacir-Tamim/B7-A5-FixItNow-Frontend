import {
  Home,
  Wrench,
  Calendar,
  User,
  Star,
  Users,
  BarChart3,
  FolderOpen,
} from "lucide-react";

export const navigation = {
  customer: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "My Payments", href: "/dashboard/my-payments", icon: Wrench },
    { name: "My Bookings", href: "/dashboard/my-bookings", icon: Calendar },
    { name: "My Reviews", href: "/dashboard/reviews", icon: Star },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ],

  technician: [
    { name: "Dashboard", href: "/technician-dashboard", icon: Home },
    {
      name: "My Services",
      href: "/technician-dashboard/services",
      icon: Wrench,
    },
    {
      name: "Availability",
      href: "/technician-dashboard/availability",
      icon: Calendar,
    },
    {
      name: "Bookings",
      href: "/technician-dashboard/bookings",
      icon: Calendar,
    },
    {
      name: "Earnings",
      href: "/technician-dashboard/earnings",
      icon: BarChart3,
    },

    { name: "Profile", href: "/technician-dashboard/profile", icon: User },
  ],

  admin: [
    { name: "Dashboard", href: "/admin-dashboard", icon: Home },
    { name: "Users", href: "/admin-dashboard/users", icon: Users },
    { name: "Bookings", href: "/admin-dashboard/bookings", icon: Calendar },
    { name: "Services", href: "/admin-dashboard/services", icon: Wrench },
    {
      name: "Categories",
      href: "/admin-dashboard/categories",
      icon: FolderOpen,
    },
    { name: "Analytics", href: "/admin-dashboard/analytics", icon: BarChart3 },
  ],
} as const;
