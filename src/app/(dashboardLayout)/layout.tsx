import { DashboardSidebar } from "@/components/shared/dashboard-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
  admin,
  seller,
  customer,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  seller: React.ReactNode;
  customer: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  const userInfo = data?.user;

  const dashboardContent = {
    [Roles.admin]: admin,
    [Roles.seller]: seller,
    [Roles.customer]: customer,
  };

  return (
    <SidebarProvider>
      <DashboardSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {dashboardContent[userInfo.role] || customer}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
