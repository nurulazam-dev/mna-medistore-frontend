import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

/* export const authClient = createAuthClient({
  // baseURL: "https://mna-medistore-backend.vercel.app",
  // baseURL: "http://localhost:5000",
  baseURL: env.NEXT_PUBLIC_BACKEND,
}); */

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  basePath: "/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});
