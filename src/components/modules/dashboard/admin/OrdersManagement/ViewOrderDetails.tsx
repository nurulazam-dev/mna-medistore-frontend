"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IOrderType } from "@/types";
import { Eye, MapPin, User, Package, CreditCard, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function ViewOrderDetails({ order }: { order: IOrderType }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 text-violet-600 hover:text-violet-700 hover:bg-green-50"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-violet-700">
            <Package size={20} />
            Order Information
          </DialogTitle>
          <div className="flex items-center gap-2 mt-1 text-xs font-mono text-muted-foreground">
            <Hash size={12} /> ID: {order.id}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-2 text-primary uppercase tracking-wider">
                <User size={16} /> Customer Details
              </h3>
              <div className="bg-muted/30 p-3 rounded-lg border space-y-1">
                <p className="font-semibold text-sm">{order.customer?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {order.customer?.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {order.customer?.phone || "No phone provided"}
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-2 text-primary uppercase tracking-wider">
                <MapPin size={16} /> Shipping To
              </h3>
              <div className="bg-muted/30 p-3 rounded-lg border text-sm italic min-h-15">
                {order.shipping_address}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-2 text-primary uppercase tracking-wider">
                <CreditCard size={16} /> Payment & Status
              </h3>
              <div className="bg-muted/30 p-3 rounded-lg border space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Status:</span>
                  <Badge
                    variant="outline"
                    className="font-bold border-violet-300 text-violet-700"
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Method:</span>
                  <span className="font-medium uppercase">
                    {order?.payment_method.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {formatDate(order?.createdAt)}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <Separator />

        <div className="mt-2">
          <h3 className="text-sm font-bold flex items-center gap-2 text-primary uppercase tracking-wider mb-4">
            <Package size={16} /> Items Summary
          </h3>
          <div className="rounded-lg border overflow-hidden">
            <div className="grid grid-cols-4 bg-muted/50 p-2 text-xs font-bold uppercase tracking-tight">
              <div className="col-span-2">Medicine</div>
              <div className="text-center">Qty</div>
              <div className="text-right">Price</div>
            </div>
            <div className="divide-y max-h-50 overflow-y-auto">
              {order?.items?.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 p-3 text-sm items-center"
                >
                  <div className="col-span-2 font-medium">
                    {item.medicine?.name || "Product Name"}
                  </div>
                  <div className="text-center text-muted-foreground font-mono">
                    {item.quantity}
                  </div>
                  <div className="text-right font-bold">
                    ${Number(item.sub_total).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm py-2 px-3.5  text-muted-foreground">
            <p className="font-bold">Shipping Cost : </p> <p>$ 10.00</p>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <div className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center gap-4 shadow-sm shadow-violet-200">
            <span className="text-sm font-medium opacity-80 uppercase">
              Total Amount
            </span>
            <span className="text-2xl font-black">
              ${Number(order.total_amount).toFixed(2)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
