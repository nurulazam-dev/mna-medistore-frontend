import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    FRONTEND_URL: z.url(),
    BACKEND_URL: z.url(),
    BACKEND_API_URL: z.url(),
    BACKEND_AUTH_URL: z.url(),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_FRONTEND: z.string(),
    NEXT_PUBLIC_BACKEND: z.string(),
  },

  runtimeEnv: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    BACKEND_AUTH_URL: process.env.BACKEND_AUTH_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_FRONTEND: process.env.NEXT_PUBLIC_FRONTEND,
    NEXT_PUBLIC_BACKEND: process.env.NEXT_PUBLIC_BACKEND,
  },
});
