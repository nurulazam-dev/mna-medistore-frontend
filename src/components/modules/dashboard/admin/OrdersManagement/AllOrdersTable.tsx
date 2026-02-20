import { IOrderType } from "@/types";
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
import ViewOrderDetails from "./ViewOrderDetails";

export default function AllOrdersTable({
  orders,
  meta,
}: {
  orders: IOrderType[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}) {
  const currentPage = meta?.page || 1;
  const limit = meta?.limit || 10;

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
            <TableHead className="text-center">Total Amount</TableHead>
            <TableHead className="text-center">Payment</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Ordered At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.length > 0 ? (
            orders.map((order, index) => (
              <TableRow
                key={order?.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="text-center font-medium">
                  {String((currentPage - 1) * limit + (index + 1)).padStart(
                    2,
                    "0",
                  )}
                </TableCell>

                <TableCell className="font-mono text-xs uppercase">
                  #{order?.id?.slice(0, 8)}
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-primary">
                      {order?.customer?.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground italic">
                      {order?.customer?.email}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-center font-bold">
                  ${Number(order?.total_amount).toFixed(2)}
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                    <CreditCard size={12} />
                    {order?.payment_method?.replace(/_/g, " ")}
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  {getStatusBadge(order?.status)}
                </TableCell>

                <TableCell className="text-muted-foreground text-xs italic">
                  {formatDate(order?.createdAt)}
                </TableCell>

                <TableCell className="flex justify-center items-center gap-2">
                  {/* <UpdateOrderStatus orderId={order.id} currentStatus={order.status} /> */}
                  <ViewOrderDetails order={order} />
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
