import { env } from "@/env";
import {
  GetMedicinesParams,
  MedicineCreateInput,
  ServiceOptions,
} from "@/types";
import { cookies } from "next/headers";

const NEXT_PUBLIC_BACKEND = env.NEXT_PUBLIC_BACKEND;

export const medicineService = {
  /* getMedicines: async function () {
    try {
      const url = new URL(`${NEXT_PUBLIC_BACKEND}/medicines`);

      const res = await fetch(url.toString(), {
        next: {
          tags: ["medicines"],
        },
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to fetch medicines" },
        };
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong from get medicines data" },
      };
    }
  }, */

  getMedicines: async function (
    params?: GetMedicinesParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${NEXT_PUBLIC_BACKEND}/medicines`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["medicines"] };
      const res = await fetch(url.toString(), config);

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to fetch medicines" },
        };
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong from get medicines data" },
      };
    }
  },

  /*  getMyMedicines: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/medicines/my-medicines`, {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["my-medicines"] },
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to fetch my-medicines" },
        };
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong from get my-medicines data" },
      };
    }
  }, */

  getMyMedicines: async function (
    params?: GetMedicinesParams,
    options?: ServiceOptions,
  ) {
    try {
      const cookieStore = await cookies();

      const url = new URL(`${NEXT_PUBLIC_BACKEND}/medicines/my-medicines`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
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

      config.next = { ...config.next, tags: ["my-medicines"] };

      const res = await fetch(url.toString(), config);

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to fetch my-medicines" },
        };
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong from get my-medicines data" },
      };
    }
  },

  getMedicineById: async function (id: string) {
    try {
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/medicines/${id}`, {
        next: { tags: [`medicine-${id}`] },
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to fetch medicine" },
        };
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong from get medicine By ID" },
      };
    }
  },

  createMedicine: async function (medicineData: MedicineCreateInput) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to create medicine" },
        };
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong from create medicine" },
      };
    }
  },

  updateMedicine: async function (
    id: string,
    medicineData: Partial<MedicineCreateInput>,
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/medicines/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to updated medicine" },
        };
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something wrong to medicine update" },
      };
    }
  },

  adminUpdateMedicine: async function (
    id: string,
    medicineData: Partial<MedicineCreateInput>,
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/medicines/admin/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to updated medicine" },
        };
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something wrong to medicine update" },
      };
    }
  },

  deleteMedicine: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${NEXT_PUBLIC_BACKEND}/medicines/${id}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      });

      const data = await res.json();

      if (!res.ok)
        return {
          data: null,
          error: { message: data?.message || "Medicine delete failed" },
        };

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong to delete medicine" },
      };
    }
  },
};
