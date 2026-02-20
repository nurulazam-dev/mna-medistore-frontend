"use server";

import { userService } from "@/services/user.service";
import { IUpdateUserPayload, IUserType } from "@/types";
import { revalidatePath } from "next/cache";

export const updateProfileUser = async (payload: IUpdateUserPayload) => {
  try {
    const res = await userService.updateProfileUser(payload);

    if (res.error) {
      return {
        data: null,
        error: {
          message: res.error.message || "Failed to update profile",
        },
      };
    }

    revalidatePath("/", "layout");
    revalidatePath("/dashboard/me");
    revalidatePath("/admin-dashboard/me");
    revalidatePath("/seller-dashboard/me");

    return {
      data: res.data,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: err.message || "An unexpected error occurred during update",
      },
    };
  }
};

export const adminUpdateUser = async (
  id: string,
  payload: Partial<IUserType>,
) => {
  try {
    const res = await userService.adminUpdateUser(id, payload as any);

    if (res.error) {
      return {
        data: null,
        error: {
          message: res.error.message || "Failed to update user",
        },
      };
    }
    revalidatePath("/", "layout");
    revalidatePath("/admin-dashboard/users");
    revalidatePath("/admin-dashboard/me");
    revalidatePath("/seller-dashboard/me");
    revalidatePath("/dashboard/me");

    return {
      data: res.data,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: err.message || "An unexpected error occurred during update",
      },
    };
  }
};
