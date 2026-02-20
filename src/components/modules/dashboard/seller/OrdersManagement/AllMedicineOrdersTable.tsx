import { ISellerOrderType } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PackageOpen, CreditCard } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ViewOrderDetails from "./ViewMedicineOrderDetails";
import UpdateOrderStatus from "./UpdateOrderStatus";

export default function AllMedicineOrdersTable({
  orders,
}: {
  orders: ISellerOrderType[];
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
            <TableHead>Customer</TableHead>
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
            orders.map((item, index) => (
              <TableRow
                key={item?.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="text-center font-medium">
                  {String(index + 1).padStart(2, "0")}
                </TableCell>

                <TableCell className="font-mono text-xs uppercase">
                  #{item?.orderId?.slice(0, 8)}
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-primary">
                      {item?.order?.customer?.name || "N/A"}
                    </span>
                    <span className="text-[10px] text-muted-foreground italic">
                      {item?.order?.customer?.email || "N/A"}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="text-xs font-medium">
                    {item?.medicine?.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase">
                    {item?.medicine?.manufacturer}
                  </div>
                </TableCell>

                <TableCell className="text-center font-bold">
                  ${Number(item?.sub_total).toFixed(2)}
                  <span className="block text-[10px] font-normal text-muted-foreground italic">
                    ({item?.quantity} pcs)
                  </span>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                    <CreditCard size={12} />
                    {item?.order?.payment_method?.replace(/_/g, " ")}
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  {getStatusBadge(item?.order?.status || "PLACED")}
                </TableCell>

                <TableCell className="text-muted-foreground text-xs italic">
                  {formatDate(item?.order?.createdAt)}
                </TableCell>

                <TableCell className="flex justify-center items-center gap-2">
                  <UpdateOrderStatus
                    orderId={item.id}
                    currentStatus={item.order.status}
                  />
                  <ViewOrderDetails item={item} order={item.order} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                  <PackageOpen className="h-10 w-10 opacity-20" />
                  <p className="font-medium text-lg">No orders found.</p>
                  <p className="text-sm italic">
                    When customers buy products, they will appear here.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
