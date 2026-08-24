

"use client";

import SearchBar from "./SearchBar";
import NavbarActions from "./NavbarActions";
import { ApiResponse } from "../types/dashboard.types";

interface Props {
  user: ApiResponse;
}

export default function DashboardNavbar({
  user,
}: Props) {
  return (
    <nav className="hidden lg:flex h-16 border-b bg-card px-6 items-center justify-between">
      <SearchBar />

      <NavbarActions user={user} />
    </nav>
  );
}





