export const dynamic = "force-dynamic";

import AllMedicineOrdersTable from "@/components/modules/dashboard/seller/OrdersManagement/AllMedicineOrdersTable";
import { orderService } from "@/services/order.service";
import { userService } from "@/services/user.service";
import { LayoutList } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ManageMyMedicinesOrder() {
  const [sessionData, ordersRes] = await Promise.all([
    userService.getSession(),
    orderService.getMyMedicinesOrders(),
  ]);

  const session = sessionData?.data;
  const orders = ordersRes?.data?.data || [];

  if (!session?.user || session?.user?.role !== "SELLER") {
    redirect(session?.user ? "/dashboard" : "/login");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Orders Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage my all medicine orders (Seller) and track orders.
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg border text-sm font-medium">
            <LayoutList size={18} className="text-primary" />
            <span>Total: {orders?.length}</span>
          </div>
        </div>
      </div>
      <AllMedicineOrdersTable orders={orders} />
    </div>
  );
}
