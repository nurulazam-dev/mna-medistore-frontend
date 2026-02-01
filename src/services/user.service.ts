import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_AUTH_URL = env.BACKEND_AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return {
        data: null,
        error: { message: "Something Went Wrong in session data" },
      };
    }
  },
};
