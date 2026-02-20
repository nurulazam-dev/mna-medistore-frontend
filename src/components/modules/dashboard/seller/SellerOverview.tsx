"use client";

import {
  ShoppingBag,
  Package,
  CheckCircle2,
  Clock,
  DollarSign,
  Database,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { IMedicineType, ISellerOrderType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

export default function SellerOverview({
  orders,
  myMedicines,
}: {
  orders: ISellerOrderType[];
  myMedicines: IMedicineType[];
}) {
  const totalOrders = orders?.length || 0;

  const pendingOrders = orders?.filter(
    (o) => o?.order?.status === "PLACED" || o?.order?.status === "PROCESSING",
  )?.length;

  const completedOrders = orders?.filter(
    (o) => o?.order?.status === "DELIVERED",
  )?.length;

  const totalEarning = orders
    .filter((o) => o?.order?.status !== "CANCELLED")
    .reduce((sum, o) => sum + Number(o?.sub_total), 0);

  const totalStock = myMedicines?.reduce(
    (sum, m) => sum + (Number(m?.stock) || 0),
    0,
  );

  const totalInvestAmount = myMedicines?.reduce(
    (sum, m) => sum + Number(m?.price) * (Number(m?.stock) || 0),
    0,
  );

  const totalActiveMedicines = myMedicines?.filter(
    (m) => m.isActive === true,
  )?.length;

  const totalInactiveMedicines = myMedicines?.filter(
    (m) => m.isActive === false,
  )?.length;

  const lowStockItems = myMedicines?.filter(
    (m) => (m?.stock || 0) < 10,
  )?.length;

  const stats = [
    {
      title: "Total Revenue",
      value: `$ ${totalEarning.toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Active Products",
      value: totalActiveMedicines,
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Inventory Value",
      value: `$ ${totalInvestAmount.toFixed(2)}`,
      icon: Database,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Total Stock",
      value: totalStock,
      icon: Package,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  const orderStats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      border: "border-l-4 border-l-slate-300",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock,
      border: "border-l-4 border-l-amber-500",
    },
    {
      title: "Completed",
      value: completedOrders,
      icon: CheckCircle2,
      border: "border-l-4 border-l-emerald-500",
    },
    {
      title: "Low Stock Alert",
      value: lowStockItems,
      icon: AlertTriangle,
      border: "border-l-4 border-l-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {orderStats?.map((item, index) => (
          <div
            key={index}
            className={`bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm flex items-center gap-4 ${item?.border}`}
          >
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
              <item.icon
                size={18}
                className="text-slate-600 dark:text-slate-400"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {item?.title}
              </p>
              <p className="text-xl font-bold">{item?.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats?.map((stat, index) => (
          <Card
            key={index}
            className="border-none shadow-sm bg-white dark:bg-slate-900"
          >
            <CardContent className="px-5 py-1">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    {stat?.title}
                  </p>
                  <h3 className="text-2xl font-bold">{stat?.value}</h3>
                </div>
                <div className={`${stat?.bg} p-1 rounded`}>
                  <stat.icon className={`h-8 w-8 ${stat?.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white flex justify-between items-center overflow-hidden relative">
          <div className="z-10">
            <h4 className="text-slate-400 text-sm font-medium mb-1">
              Total Inactive Products
            </h4>
            <p className="text-4xl font-black">{totalInactiveMedicines}</p>
            <p className="text-xs text-slate-400 mt-2">
              These products are currently hidden from shop.
            </p>
          </div>
          <Activity className="absolute -right-4 -bottom-4 h-32 w-32 text-white/5" />
        </div>

        <div className="bg-emerald-600 rounded-2xl p-6 text-white flex justify-between items-center overflow-hidden relative">
          <div className="z-10">
            <h4 className="text-emerald-100 text-sm font-medium mb-1">
              Success Rate
            </h4>
            <p className="text-4xl font-black">
              {totalOrders > 0
                ? ((completedOrders / totalOrders) * 100).toFixed(0)
                : 0}
              %
            </p>
            <p className="text-xs text-emerald-100 mt-2">
              Based on total delivered orders.
            </p>
          </div>
          <CheckCircle2 className="absolute -right-4 -bottom-4 h-32 w-32 text-white/10" />
        </div>
      </div>
    </div>
  );
}
