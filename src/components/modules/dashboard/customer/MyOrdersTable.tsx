import { ICustomerOrderType } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PackageOpen, CreditCard, TriangleAlert } from "lucide-react";
import { formatDate } from "@/lib/utils";
import CancelMyOrder from "./CancelMyOrder";
import ViewMyOrderDetails from "./ViewMyOrderDetails";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MyOrdersTable({
  orders,
}: {
  orders: ICustomerOrderType[];
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PLACED":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            PLACED
          </Badge>
        );
      case "PROCESSING":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            PROCESSING
          </Badge>
        );
      case "SHIPPED":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
            SHIPPED
          </Badge>
        );
      case "DELIVERED":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 font-bold">
            DELIVERED
          </Badge>
        );
      case "CANCELLED":
        return <Badge variant="destructive">CANCELLED</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="border rounded-md overflow-hidden bg-card">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="text-center w-12.5">#</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead className="text-center">Medicine Info</TableHead>
            <TableHead className="text-center">Total Amount</TableHead>
            <TableHead className="text-center">Payment</TableHead>
            <TableHead className="text-center">Status</TableHead>
            {/* <TableHead>Ordered At</TableHead> */}
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.length > 0 ? (
            orders.map((order, index) => {
              const firstItem = order?.items?.[0];

              return (
                <TableRow
                  key={order?.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="text-center font-medium">
                    {index + 1}
                  </TableCell>

                  <TableCell className="font-mono text-xs uppercase">
                    #{order?.id?.slice(0, 8)}
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="text-xs font-medium">
                      {firstItem?.medicine?.name || "Unknown Medicine"}
                    </div>
                    {/* <div className="text-xs font-medium">
                      {firstItem?.quantity}
                    </div> */}
                    {order.items.length > 1 && (
                      <div className="text-[9px] text-blue-600 font-bold italic">
                        + {order.items.length - 1} more items
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="text-center font-bold">
                    ${Number(order?.total_amount).toFixed(2)}
                    <span className="block text-[10px] font-normal text-muted-foreground italic">
                      ({order?.items?.length} items)
                    </span>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                      <CreditCard size={12} />
                      {order?.payment_method?.replace(/_/g, " ")}
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    {getStatusBadge(order?.status || "PLACED")}
                  </TableCell>

                  <TableCell className="text-muted-foreground text-xs italic">
                    {formatDate(order?.createdAt)}
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-2">
                      {order?.status === "PLACED" ? (
                        <CancelMyOrder
                          orderId={order.id}
                          currentStatus={order.status}
                        />
                      ) : (
                        <TooltipProvider>
                          <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-orange-700 border-orange-200 bg-orange-50/30 hover:bg-orange-100 hover:text-orange-800 transition-all cursor-help"
                              >
                                <TriangleAlert size={14} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="bg-orange-700 text-white border-red-600"
                            >
                              <p className="text-xs">No Cancellable Order</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}

                      <ViewMyOrderDetails order={order} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                  <PackageOpen className="h-10 w-10 opacity-20" />
                  <p className="font-medium text-lg">No orders found.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
