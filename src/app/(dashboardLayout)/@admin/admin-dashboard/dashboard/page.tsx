// export const dynamic = "force-dynamic";

import AdminStatsOverview from "@/components/modules/dashboard/admin/StatsOverview/AdminStatsOverview";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import { categoryService } from "@/services/category.service";
import { medicineService } from "@/services/medicine.service";
import { orderService } from "@/services/order.service";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function AdminOverviewPage() {
  const [sessionData, usersRes, categoriesRes, ordersRes, medicinesRes] =
    await Promise.all([
      userService.getSession(),
      userService.getUsers(),
      categoryService.getCategories(),
      orderService.getAllOrders(),
      medicineService.getMedicines(),
    ]);

  const session = sessionData?.data;
  const users = usersRes?.data?.data || [];
  const categories = categoriesRes?.data?.data || [];
  const orders = ordersRes?.data?.data?.data || [];
  const medicines = medicinesRes?.data?.data?.data || [];
  const medicinesCount = medicinesRes?.data?.data?.pagination?.total;

  if (!session?.user) {
    redirect("/login");
  }

  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6">
      <DashboardHeader user={session?.user} />
      <AdminStatsOverview
        users={users?.data}
        usersCount={users?.pagination?.total}
        categories={categories}
        orders={orders}
        medicines={medicines}
        medicinesCount={medicinesCount}
      />
    </div>
  );
}
