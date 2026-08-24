"use client";

import SidebarContent from "./SidebarContent";
import MobileHeader from "./MobileHeader";
import { ApiResponse } from "../types/dashboard.types";

interface Props {
  user: ApiResponse;
}

export default function DashboardSidebar({ user }: Props) {
  // Backend returns role directly in user.data.role (not user.data.profile.role)
  const role = (user.data?.role ?? "CUSTOMER").toLowerCase() as
    | "customer"
    | "technician"
    | "admin";

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r bg-sidebar lg:flex">
        <SidebarContent role={role} />
      </aside>

      {/* Mobile Header */}
      <MobileHeader role={role} user={user} />

      <div className="hidden w-72 shrink-0 lg:block" />
    </>
  );
}
