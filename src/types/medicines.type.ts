import { ICategoryType } from "./categories.type";
import { IUserType } from "./users.type";

export interface IMedicineType {
  id: string;
  name: string;
  description: string;
  image?: string | null;
  price: number;
  stock?: number | null;
  manufacturer: string;
  isActive?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  sellerId: string;
  categoryId: string;
  category?: ICategoryType;
  seller?: IUserType;
  orderItems?: any[];
  reviews?: any[];
}

export type MedicineCreateInput = Omit<
  IMedicineType,
  "id" | "createdAt" | "updatedAt" | "category" | "seller"
>;

export interface GetMedicinesParams {
  search?: string;
  page?: string;
}

export interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
