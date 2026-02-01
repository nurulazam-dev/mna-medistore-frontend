import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  // validation
  server: {
    FRONTEND_URL: z.url(),
    BACKEND_URL: z.url(),
    BACKEND_API_URL: z.url(),
    BACKEND_AUTH_URL: z.url(),
  },

  client: {
    NEXT_PUBLIC_TEST: z.string(),
  },

  runtimeEnv: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    BACKEND_AUTH_URL: process.env.BACKEND_AUTH_URL,
    NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
  },
});
