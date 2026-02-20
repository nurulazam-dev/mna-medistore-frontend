// export const dynamic = "force-dynamic";

import UsersTable from "@/components/modules/dashboard/admin/UsersManagement/UsersTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { userService } from "@/services/user.service";
import { LayoutList } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ManageUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const searchTerm = (params.query as string) || "";

  const [sessionData, usersRes] = await Promise.all([
    userService.getSession(),
    userService.getUsers({
      page,
      limit,
      searchTerm,
    }),
  ]);

  const session = sessionData?.data;
  const users = usersRes?.data?.data?.data || [];

  const pagination = usersRes?.data?.data?.pagination || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  if (!session?.user || session?.user?.role !== "ADMIN") {
    redirect(session?.user ? "/dashboard" : "/login");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Users Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage users and track user.
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg border text-sm font-medium">
            <LayoutList size={18} className="text-primary" />
            <span>Total: {pagination?.total}</span>
          </div>
        </div>
      </div>
      <UsersTable users={users} meta={pagination} />
      <PaginationControls meta={pagination} />
    </div>
  );
}
