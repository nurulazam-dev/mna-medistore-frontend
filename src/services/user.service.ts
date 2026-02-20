import { env } from "@/env";
import { ServiceOptions } from "@/types";
import { cookies } from "next/headers";

const NEXT_PUBLIC_BACKEND = env.NEXT_PUBLIC_BACKEND;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const cookieString = cookieStore.toString();

      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/api/auth/get-session`, {
        headers: {
          Cookie: cookieString,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch session" } };
      }

      const session = await res.json();

      if (!session || !session.user) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something Went Wrong in session data" },
      };
    }
  },

  /* getUsers: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/users`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const result = await res.json();
      if (!res.ok) return { data: null, error: result };

      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to load users" } };
    }
  }, */

  getUsers: async function (
    params?: Record<string, any>,
    options?: ServiceOptions,
  ) {
    try {
      const cookieStore = await cookies();

      const url = new URL(`${NEXT_PUBLIC_BACKEND}/users`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: options?.cache || "no-store",
      });

      const result = await res.json();

      if (!res.ok) return { data: null, error: result };

      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to load users" } };
    }
  },

  updateUserStatus: async function (id: string, status: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();
      if (!res.ok) return { data: null, error: result };

      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to update status" } };
    }
  },

  updateProfileUser: async function (userData: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/users/update-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(userData),
        cache: "no-store",
      });

      const result = await res.json();
      if (!res.ok) return { data: null, error: result };

      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: { message: "Profile update failed" } };
    }
  },

  adminUpdateUser: async function (id: string, userData: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/users/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(userData),
        cache: "no-store",
      });

      const result = await res.json();
      if (!res.ok) return { data: null, error: result };

      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: { message: "Profile update failed" } };
    }
  },

  getSingleUser: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) return { data: null, error: result };

      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to load user" } };
    }
  },
};
