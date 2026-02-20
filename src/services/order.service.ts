import { env } from "@/env";
import {
  ICreateOrderPayload,
  IOrderStatus,
  ISellerOrderType,
  ServiceOptions,
} from "@/types";
import { cookies } from "next/headers";

const NEXT_PUBLIC_BACKEND = env.NEXT_PUBLIC_BACKEND;

export const orderService = {
  createOrder: async function (orderData: ICreateOrderPayload) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          data: null,
          error: data?.message || "Failed to order",
        };
      }

      return { success: true, data, error: null };
    } catch (err: any) {
      return {
        success: false,
        data: null,
        error: "Something went wrong from order",
      };
    }
  },

  getAllOrders: async function (
    params?: Record<string, any>,
    options?: ServiceOptions,
  ) {
    try {
      const cookieStore = await cookies();

      const url = new URL(`${NEXT_PUBLIC_BACKEND}/orders/admin/orders`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const config: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: options?.cache || "no-store",
      };

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);

      const result = await res.json();

      if (!res.ok) return { data: null, error: result };

      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to load orders" } };
    }
  },

  getMyMedicinesOrders: async function (
    params?: Record<string, any>,
    options?: ServiceOptions,
  ) {
    try {
      const cookieStore = await cookies();

      const url = new URL(
        `${NEXT_PUBLIC_BACKEND}/orders/seller/my-medicine-orders`,
      );

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const config: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: options?.cache || "no-store",
      };

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);

      const result = await res.json();

      if (!res.ok) return { data: null, error: result };

      return { data: result, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to load medicine orders" },
      };
    }
  },

  updateOrderStatus: async function (id: string, status: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${NEXT_PUBLIC_BACKEND}/orders/seller/update-my-medicine-orders/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify({ status }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data?.message || "Failed to update status",
          errorDetails: data?.errorDetails,
        };
      }

      return {
        success: true,
        data: data,
        message: "Status updated successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: "Something wrong to order update",
      };
    }
  },

  cancelMyOrder: async function (id: string, status: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${NEXT_PUBLIC_BACKEND}/orders/my-orders/cancel/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify({ status }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data?.message || "Failed to cancel order",
          errorDetails: data?.errorDetails,
        };
      }

      return {
        success: true,
        data: data,
        message: "Order cancelled successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: "Something wrong to order cancel",
      };
    }
  },

  getMyAllOrders: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/orders/my-orders`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const result = await res.json();
      if (!res.ok) return { data: null, error: result };

      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to load orders" } };
    }
  },
};
