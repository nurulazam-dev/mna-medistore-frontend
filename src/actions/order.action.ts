"use server";

import { orderService } from "@/services/order.service";
import { ICreateOrderPayload } from "@/types";
import { revalidatePath, updateTag } from "next/cache";

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await orderService.updateOrderStatus(id, status);

  if (res.success) {
    updateTag("my-medicine-order");
    // revalidateTag("my-medicine-order");
  }

  return res;
};

export const cancelMyOrder = async (id: string, status: string) => {
  const res = await orderService.cancelMyOrder(id, status);

  if (res.success) {
    revalidatePath("/dashboard/orders");
    updateTag("my-order");
    // revalidateTag("my-medicine-order");
  }

  return res;
};

export const createOrder = async (data: ICreateOrderPayload) => {
  const res = await orderService.createOrder(data);
  if (res.data) {
    updateTag("order");
  }
  return res;
};
