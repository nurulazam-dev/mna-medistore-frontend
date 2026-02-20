// export const dynamic = "force-dynamic";

import MyOrdersTable from "@/components/modules/dashboard/customer/MyOrdersTable";
import { orderService } from "@/services/order.service";
import { userService } from "@/services/user.service";
import { LayoutList } from "lucide-react";
import { redirect } from "next/navigation";

export default async function MyOrdersPage() {
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
    <div>
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
          <p className="text-muted-foreground text-sm">
            Manage my orders (Customer) and track orders.
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg border text-sm font-medium">
            <LayoutList size={18} className="text-primary" />
            <span>Total: {orders?.length}</span>
          </div>
        </div>
      </div>
      <MyOrdersTable orders={orders} />
    </div>
  );
}
