import { env } from "@/env";
import { ICategoryType } from "@/types";
import { cookies } from "next/headers";

const NEXT_PUBLIC_BACKEND = env.NEXT_PUBLIC_BACKEND;

export const categoryService = {
  getCategories: async function () {
    try {
      const url = new URL(`${NEXT_PUBLIC_BACKEND}/categories`);

      const res = await fetch(url.toString(), {
        next: {
          tags: ["categories"],
        },
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch categories" } };
      }

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong from get categories data" },
      };
    }
  },

  getCategoryById: async function (id: string) {
    try {
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/categories/${id}`);

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch category" } };
      }

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong from get category By ID" },
      };
    }
  },

  createCategory: async function (categoryData: ICategoryType) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(categoryData),
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to create category" } };
      }

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Category created failed" },
        };
      }
      return { data: data, error: null };
    } catch (err) {
      console.error(err);

      return {
        data: null,
        error: { message: "Something went wrong from create Category" },
      };
    }
  },

  updateCategory: async function (
    id: string,
    categoryData: Partial<ICategoryType>,
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(categoryData),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to updated category" },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something wrong to category update" },
      };
    }
  },
};
