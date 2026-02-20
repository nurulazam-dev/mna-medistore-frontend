// export const dynamic = "force-dynamic";

import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import CustomerOverview from "@/components/modules/dashboard/customer/CustomerOverview";
import { orderService } from "@/services/order.service";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function CustomerOverviewPage() {
  const [sessionData, ordersRes] = await Promise.all([
    userService.getSession(),
    orderService.getMyAllOrders(),
  ]);

  const session = sessionData?.data;
  const orders = ordersRes?.data?.data || [];

  if (!session?.user) {
    redirect("/login");
  }

  if (session?.user?.role !== "CUSTOMER") {
    redirect("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6">
      <DashboardHeader user={session?.user} />
      <CustomerOverview orders={orders} />
    </div>
  );
}
