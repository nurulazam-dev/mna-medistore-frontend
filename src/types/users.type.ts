import { IMedicineType } from "./medicines.type";

export type UserRole = "ADMIN" | "SELLER" | "CUSTOMER";
export type UserStatus = "ACTIVE" | "BLOCKED";

export interface IUserType {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: UserRole;
  phone?: string | null;
  status: UserStatus;
  address?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;

  medicines?: IMedicineType;
  orders?: any[];
  reviews?: any[];
  orderItems?: any[];

  sessions?: any[];
  accounts?: any[];
}

export type IUpdateUserPayload = Partial<
  Pick<IUserType, "name" | "image" | "phone" | "address">
>;

export interface IAdminUpdatePayload {
  name?: string;
  phone?: string;
  address?: string;
  role?: UserRole;
  status?: UserStatus;
  emailVerified?: boolean;
}
