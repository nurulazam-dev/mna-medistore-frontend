"use server";

import { categoryService } from "@/services/category.service";
import { ICategoryType } from "@/types";
import { updateTag } from "next/cache";

export const getCategories = async () => {
  return await categoryService.getCategories();
};

export const createCategory = async (data: ICategoryType) => {
  const res = await categoryService.createCategory(data);
  if (res.data) {
    updateTag("categories");
  }
  return res;
};

export const updateCategory = async (
  id: string,
  data: Partial<ICategoryType>,
) => {
  const res = await categoryService.updateCategory(id, data);
  if (res.data) {
    updateTag("categories");
  }
  return res;
};
