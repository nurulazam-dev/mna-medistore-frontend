"use server";

import { env } from "@/env";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (base64String: string) => {
  if (!base64String) {
    return { url: null, error: "No image data provided" };
  }

  try {
    const res = await cloudinary.uploader.upload(base64String, {
      folder: "medicines",
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    return { url: res.secure_url, error: null };
  } catch (err: any) {
    return { url: null, error: err.message || "Image upload fail" };
  }
};
