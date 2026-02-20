export const dynamic = "force-dynamic";

import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import SellerOverview from "@/components/modules/dashboard/seller/SellerOverview";
import { medicineService } from "@/services/medicine.service";
import { orderService } from "@/services/order.service";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function SellerOverviewPage() {
  const [sessionData, ordersRes, medicinesRes] = await Promise.all([
    userService.getSession(),
    orderService.getMyMedicinesOrders(),
    medicineService.getMyMedicines(),
  ]);

  const session = sessionData?.data;
  const orders = ordersRes?.data?.data || [];
  const myMedicines = medicinesRes?.data?.data?.data || [];

  if (!session?.user) {
    redirect("/login");
  }

  if (session?.user?.role !== "SELLER") {
    redirect("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6">
      <DashboardHeader user={session?.user} />
      <SellerOverview orders={orders} myMedicines={myMedicines} />
    </div>
  );
}
