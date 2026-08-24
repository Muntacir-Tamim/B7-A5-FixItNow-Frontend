

import { getMe } from "@/services/getMe";
import DashboardNavbar from "./_components/DashboardNavbar";
import DashboardSidebar from "./_components/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  return (
    <div className=" lg:flex min-h-screen ">
      <DashboardSidebar user={user} />

      <main className="flex-1">
        <DashboardNavbar user={user} />

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}



