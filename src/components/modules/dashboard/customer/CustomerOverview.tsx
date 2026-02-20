"use client";

import { ShoppingBag, Truck, CheckCircle2, Wallet, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICustomerOrderType } from "@/types";
import { Button } from "@/components/ui/button";

export default function CustomerOverview({
  orders,
}: {
  orders: ICustomerOrderType[];
}) {
  const totalOrders = orders?.length;
  const pendingOrders = orders?.filter(
    (o) => o?.status === "PLACED" || o?.status === "PROCESSING",
  )?.length;
  const completedOrders = orders?.filter(
    (o) => o?.status === "DELIVERED",
  )?.length;
  const totalSpent = orders
    .filter((o) => o?.status !== "CANCELLED")
    .reduce((sum, o) => sum + Number(o?.total_amount), 0);

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "In Progress",
      value: pendingOrders,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Completed",
      value: completedOrders,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Total Spent",
      value: `$ ${totalSpent.toFixed(2)}`,
      icon: Wallet,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-none shadow-sm bg-card/50 backdrop-blur"
          >
            <CardContent className="px-6">
              <div className="flex items-center justify-between space-y-0 pb-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className={`${stat.bg} p-1 rounded`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/10"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold font-mono">
                      #{order.id.slice(0, 8)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {order?.items?.length} items •{" "}
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">
                      ${Number(order.total_amount).toFixed(2)}
                    </span>
                    <div
                      className={`h-2 w-2 rounded-full ${
                        order.status === "DELIVERED"
                          ? "bg-emerald-500"
                          : order.status === "CANCELLED"
                            ? "bg-red-500"
                            : "bg-amber-500"
                      }`}
                    />
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <p className="text-center text-muted-foreground py-8 italic">
                  Orders not found!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-none bg-indigo-600 text-white shadow-lg overflow-hidden relative">
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Health Tip of the Day!</h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Stay hydrated and remember to take your multivitamins on time.
                Tracking your medicine schedule is now easier with Gemini
                Pharmacy.
              </p>
            </div>
            <div className="mt-8 z-10">
              <Button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
                Browse Medicines
              </Button>
            </div>

            <ShoppingBag className="absolute -bottom-10 -right-10 h-40 w-40 text-white/10 rotate-12" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
