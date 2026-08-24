// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   Menu,
//   User,
//   Settings,
//   LogOut,
//   Home,
//   Search,
//   Users,
//   PlayCircle,
//   LayoutDashboard,
//   Contact,
// } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import ThemeSwitcher from "./ThemeSwitcher";
// import { logout } from "@/services/logout";
// import { toast } from "sonner";
// import SiteLogo from "./SiteLogo";

// const navItems = [
//   { href: "/", label: "Home", icon: Home },
//   { href: "/services", label: "Services", icon: Search },
//   { href: "/find-technicians", label: "Find Technicians", icon: Users },
//   { href: "/how-it-works", label: "How It Works", icon: PlayCircle },
//   { href: "/contact", label: "Contact", icon: Contact },
// ];

// // getMe returns: { success: boolean, data: User | null }
// // User object: { id, name, email, phone, address, role, status, createdAt, technicianProfile }
// type IUser = {
//   success: boolean;
//   message?: string;
//   data?: {
//     id: string;
//     name: string;
//     email: string;
//     phone?: string;
//     address?: string;
//     role: string;
//     status: string;
//     createdAt: string;
//     technicianProfile?: unknown;
//   };
// };

// type NavbarProps = {
//   user: IUser;
// };

// export default function Navbar({ user }: NavbarProps) {
//   const pathname = usePathname();
//   const router = useRouter();

//   // ✅ Fix: backend returns user object directly under .data (no .profile wrapper)
//   const profile = user?.data;
//   const isLoggedIn = !!user?.success && !!profile;

//   const dashboardLink =
//     profile?.role === "ADMIN"
//       ? "/admin-dashboard"
//       : profile?.role === "TECHNICIAN"
//         ? "/technician-dashboard"
//         : "/dashboard";

//   const handleLogout = async () => {
//     try {
//       toast.loading("Logging out...", { id: "logout" });
//       await logout();
//       toast.success("Logged out successfully!", {
//         id: "logout",
//         description: "See you soon 👋",
//       });
//       router.replace("/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("Failed to logout", {
//         id: "logout",
//         description: "Please try again",
//       });
//     }
//   };

//   // Avatar initials fallback
//   const initials = profile?.name
//     ? profile.name
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .toUpperCase()
//         .slice(0, 2)
//     : "U";

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <SiteLogo />

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navItems.map((item) => {
//               const isActive = pathname === item.href;
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={cn(
//                     "flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground",
//                     isActive ? "text-primary" : "text-muted-foreground",
//                   )}
//                 >
//                   <item.icon className="h-4 w-4" />
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Right Side */}
//           <div className="flex items-center gap-3">
//             <ThemeSwitcher />

//             {isLoggedIn && profile ? (
//               /* Logged In → Avatar dropdown */
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="relative h-9 w-9 rounded-full"
//                   >
//                     <Avatar className="h-9 w-9">
//                       <AvatarImage src="" alt={profile.name} />
//                       <AvatarFallback>{initials}</AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-56" align="end" forceMount>
//                   <DropdownMenuLabel className="font-normal">
//                     <div className="flex flex-col space-y-1">
//                       <p className="text-sm font-medium leading-none">
//                         {profile.name}
//                       </p>
//                       <p className="text-xs leading-none text-muted-foreground">
//                         {profile.email}
//                       </p>
//                     </div>
//                   </DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem asChild>
//                     <Link href={dashboardLink} className="cursor-pointer">
//                       <LayoutDashboard className="mr-2 h-4 w-4" />
//                       Dashboard
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link href="/profile" className="cursor-pointer">
//                       <User className="mr-2 h-4 w-4" />
//                       Profile
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link href="/settings" className="cursor-pointer">
//                       <Settings className="mr-2 h-4 w-4" />
//                       Settings
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem
//                     className="text-destructive focus:text-destructive cursor-pointer"
//                     onClick={handleLogout}
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Log out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               /* Not logged in → Login / Sign Up */
//               <div className="hidden md:flex items-center gap-3">
//                 <Button variant="ghost" asChild>
//                   <Link href="/login">Login</Link>
//                 </Button>
//                 <Button asChild>
//                   <Link href="/register">Sign Up</Link>
//                 </Button>
//               </div>
//             )}

//             {/* Mobile Menu */}
//             <Sheet>
//               <SheetTrigger asChild className="md:hidden">
//                 <Button variant="ghost" size="icon">
//                   <Menu className="h-5 w-5" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-80">
//                 <div className="flex flex-col gap-6 pt-8">
//                   <div className="flex items-center gap-3 px-2">
//                     <SiteLogo />
//                   </div>

//                   {/* Nav Links */}
//                   <div className="flex flex-col gap-2">
//                     {navItems.map((item) => (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         className={cn(
//                           "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
//                           pathname === item.href
//                             ? "bg-primary text-primary-foreground"
//                             : "hover:bg-muted",
//                         )}
//                       >
//                         <item.icon className="h-5 w-5" />
//                         {item.label}
//                       </Link>
//                     ))}
//                   </div>

//                   {/* Auth Section in Mobile */}
//                   <div className="border-t pt-6 mt-auto">
//                     {isLoggedIn && profile ? (
//                       <>
//                         <div className="px-4 mb-3">
//                           <p className="text-sm font-medium">{profile.name}</p>
//                           <p className="text-xs text-muted-foreground">
//                             {profile.email}
//                           </p>
//                         </div>
//                         <div className="space-y-1">
//                           <Link
//                             href={dashboardLink}
//                             className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-muted"
//                           >
//                             <LayoutDashboard className="h-5 w-5" /> Dashboard
//                           </Link>
//                           <Link
//                             href="/profile"
//                             className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-muted"
//                           >
//                             <User className="h-5 w-5" /> Profile
//                           </Link>
//                           <Link
//                             href="/settings"
//                             className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-muted"
//                           >
//                             <Settings className="h-5 w-5" /> Settings
//                           </Link>
//                           <button
//                             onClick={handleLogout}
//                             className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-destructive hover:bg-destructive/10"
//                           >
//                             <LogOut className="h-5 w-5" /> Log out
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="flex flex-col gap-3 px-2">
//                         <Button variant="outline" asChild className="w-full">
//                           <Link href="/login">Login</Link>
//                         </Button>
//                         <Button asChild className="w-full">
//                           <Link href="/register">Sign Up</Link>
//                         </Button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  User,
  Settings,
  LogOut,
  Home,
  Search,
  Users,
  PlayCircle,
  LayoutDashboard,
  Contact,
  LayoutGrid,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeSwitcher from "./ThemeSwitcher";
import { logout } from "@/services/logout";
import { toast } from "sonner";
import SiteLogo from "./SiteLogo";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Search },
  { href: "/categories", label: "Categories", icon: LayoutGrid },
  { href: "/find-technicians", label: "Find Technicians", icon: Users },
  { href: "/how-it-works", label: "How It Works", icon: PlayCircle },
  { href: "/contact", label: "Contact", icon: Contact },
];

// getMe returns: { success: boolean, data: User | null }
type IUser = {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    role: string;
    status: string;
    createdAt: string;
    technicianProfile?: unknown;
  };
};

type NavbarProps = {
  user: IUser;
};

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const profile = user?.data;
  const isLoggedIn = !!user?.success && !!profile;

  // ✅ Dashboard link based on role
  const dashboardLink =
    profile?.role === "ADMIN"
      ? "/admin-dashboard"
      : profile?.role === "TECHNICIAN"
        ? "/technician-dashboard"
        : "/dashboard";

  // ✅ Profile link — points inside dashboard, not a public /profile route
  const profileLink =
    profile?.role === "ADMIN"
      ? null // Admin has no profile page
      : profile?.role === "TECHNICIAN"
        ? "/technician-dashboard/profile"
        : "/dashboard/profile";

  // ✅ Settings link — points inside dashboard, not a public /settings route
  const settingsLink =
    profile?.role === "ADMIN"
      ? "/admin-dashboard/settings"
      : profile?.role === "TECHNICIAN"
        ? null // Technician has no settings page yet
        : "/dashboard/settings";

  const handleLogout = async () => {
    try {
      toast.loading("Logging out...", { id: "logout" });
      await logout();
      toast.success("Logged out successfully!", {
        id: "logout",
        description: "See you soon 👋",
      });
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout", {
        id: "logout",
        description: "Please try again",
      });
    }
  };

  // Avatar initials fallback
  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <SiteLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />

            {isLoggedIn && profile ? (
              /* Logged In → Avatar dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="" alt={profile.name} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {profile.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {profile.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={dashboardLink} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  {/* ✅ Profile — only shown if role has a profile page */}
                  {profileLink && (
                    <DropdownMenuItem asChild>
                      <Link href={profileLink} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                  )}

                  {/* ✅ Settings — only shown if role has a settings page */}
                  {settingsLink && (
                    <DropdownMenuItem asChild>
                      <Link href={settingsLink} className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Not logged in → Login / Sign Up */
              <div className="hidden md:flex items-center gap-3">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 pt-8">
                  <div className="flex items-center gap-3 px-2">
                    <SiteLogo />
                  </div>

                  {/* Nav Links */}
                  <div className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Auth Section in Mobile */}
                  <div className="border-t pt-6 mt-auto">
                    {isLoggedIn && profile ? (
                      <>
                        <div className="px-4 mb-3">
                          <p className="text-sm font-medium">{profile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {profile.email}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={dashboardLink}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-muted"
                          >
                            <LayoutDashboard className="h-5 w-5" /> Dashboard
                          </Link>

                          {/* ✅ Profile — only shown if role has a profile page */}
                          {profileLink && (
                            <Link
                              href={profileLink}
                              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-muted"
                            >
                              <User className="h-5 w-5" /> Profile
                            </Link>
                          )}

                          {/* ✅ Settings — only shown if role has a settings page */}
                          {settingsLink && (
                            <Link
                              href={settingsLink}
                              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-muted"
                            >
                              <Settings className="h-5 w-5" /> Settings
                            </Link>
                          )}

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-destructive hover:bg-destructive/10"
                          >
                            <LogOut className="h-5 w-5" /> Log out
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col gap-3 px-2">
                        <Button variant="outline" asChild className="w-full">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild className="w-full">
                          <Link href="/register">Sign Up</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
