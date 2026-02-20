"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Package,
  Truck,
  MapPin,
  Calendar,
  CreditCard,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ICustomerOrderType } from "@/types";

export default function ViewMyOrderDetails({
  order,
}: {
  order: ICustomerOrderType;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-green-600 hover:text-green-700 hover:bg-green-50 transition-all"
        >
          <Eye size={14} />
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-md overflow-y-auto p-4">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2 text-2xl font-bold">
            <Package className="text-emerald-600" />
            Order Details
          </SheetTitle>
          <p className="text-xs text-muted-foreground font-mono">
            ID: {order.id}
          </p>
        </SheetHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border border-dashed">
            <div className="space-y-1">
              <p className="text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1">
                <Truck size={12} /> Status
              </p>
              <Badge
                variant="outline"
                className="font-bold uppercase tracking-wider"
              >
                {order.status}
              </Badge>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] uppercase text-muted-foreground font-bold flex items-center justify-end gap-1">
                <Calendar size={12} /> Ordered At
              </p>
              <p className="text-xs font-medium">
                {formatDate(order?.createdAt)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <MapPin size={16} className="text-emerald-600" />
              Delivery Information
            </h3>
            <div className="bg-muted/20 p-3 rounded-md border text-sm">
              <p className="text-muted-foreground leading-relaxed italic">
                {order.shipping_address}
              </p>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-dashed">
              <span className="text-xs font-semibold flex items-center gap-1">
                <CreditCard size={14} /> Payment Method:
              </span>
              <span className="text-xs font-bold uppercase text-emerald-700">
                {order.payment_method?.replace(/_/g, " ")}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold">Order Summary</h3>
            <div className="space-y-2">
              {order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-card p-3 rounded-lg border shadow-sm"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-primary leading-tight">
                      {item.medicine.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {item.quantity} x ${Number(item.unit_price).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-700">
                      $ {Number(item.sub_total).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-1.5 px-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">
                {/* $ {Number(order.total_amount).toFixed(2)}
                 */}
                $ {Math.max(0, Number(order.total_amount) - 10).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping Fee</span>
              <span className="font-medium text-emerald-600">$ 10.00</span>
            </div>
            <div className="flex justify-between pt-2 border-t mt-2">
              <span className="text-base font-black">Total Paid</span>
              <span className="text-lg font-black text-emerald-700">
                $ {Number(order.total_amount).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
