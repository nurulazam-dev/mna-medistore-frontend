"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { cancelMyOrder } from "@/actions/order.action";

export default function CancelMyOrder({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      const res = await cancelMyOrder(orderId, "CANCELLED");

      if (res.success) {
        toast.success("Order cancelled successfully");
      } else {
        toast.error(res.message || "Failed to cancel order");
      }
    } catch (error) {
      toast.error("Something went wrong while cancelling");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 transition-all"
        >
          <Trash2 size={14} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-red-600 text-2xl gap-2">
            <Trash2 size={20} /> Are you absolutely sure?
          </AlertDialogTitle>
          <Separator className="my-1.5" />
          <AlertDialogDescription className="text-slate-300">
            This action cannot be undone. This will permanently cancel your
            order
            <span className="font-mono font-bold text-red-500 ml-1">
              #{orderId.slice(0, 8)}
            </span>
            . Once cancelled, the seller will not process this shipment.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>No, keep it</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e: any) => {
              e.preventDefault();
              handleCancel();
            }}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Yes, Cancel Order"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
