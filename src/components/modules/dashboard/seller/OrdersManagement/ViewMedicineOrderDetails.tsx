"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ISellerOrderType, IViewMedicineOrderDetailsProps } from "@/types";
import { Eye, MapPin, User, Package, CreditCard, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function ViewMedicineOrderDetails({
  item,
  order,
}: {
  item: ISellerOrderType;
  order: IViewMedicineOrderDetailsProps;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
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
            <Hash size={12} /> ID: {order?.id}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-2 text-primary uppercase tracking-wider">
                <User size={16} /> Customer Details
              </h3>
              <div className="bg-muted/30 p-3 rounded-lg border space-y-1">
                <p className="font-semibold text-sm">{order?.customer?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {order?.customer?.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {order?.customer?.phone || "N/A"}
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-2 text-primary uppercase tracking-wider">
                <MapPin size={16} /> Shipping To
              </h3>
              <div className="bg-muted/30 p-3 rounded-lg border text-sm italic min-h-15">
                {order?.shipping_address}
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
                    {order?.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Method:</span>
                  <span className="font-medium uppercase">
                    {order?.payment_method?.replace(/_/g, " ")}
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
            <div className="grid grid-cols-5 bg-muted/50 p-2 text-xs font-bold uppercase tracking-tight">
              <div className="col-span-2 text-center">Medicine</div>
              <div className="text-center">Qty</div>
              <div className="text-center">Per Unit</div>
              <div className="text-right">Price</div>
            </div>

            <div className="divide-y max-h-50 overflow-y-auto">
              <div className="grid grid-cols-5 p-4 text-sm items-center hover:bg-muted/20 transition-colors">
                <div className="col-span-2 flex flex-col gap-0.5">
                  <span className="font-bold text-primary leading-tight">
                    {item?.medicine?.name}
                  </span>
                  {item?.medicine?.manufacturer && (
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                      {item?.medicine?.manufacturer}
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center bg-violet-50 text-violet-700 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border border-violet-100">
                    {item?.quantity}
                  </span>
                </div>

                <div className="text-center text-muted-foreground font-medium font-mono text-xs">
                  ${Number(item?.unit_price).toFixed(2)}
                </div>

                <div className="text-right">
                  <span className="font-black text-violet-700 text-base">
                    ${Number(item?.sub_total).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm py-2 px-3.5  text-muted-foreground">
                <p className="font-bold">Shipping Cost : </p> <p>$ 10.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <div className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center gap-4 shadow-sm shadow-violet-200">
            <span className="text-sm font-medium opacity-80 uppercase">
              Total Amount
            </span>
            <span className="text-2xl font-black">
              ${Number(order?.total_amount).toFixed(2)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
