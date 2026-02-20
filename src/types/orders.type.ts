import { IMedicineType } from "./medicines.type";
import { IUserType } from "./users.type";

export type IOrderStatus =
  | "PLACED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type IPaymentMethod = "CASH_ON_DELIVERY";

export interface IOrderItemType {
  id: string;
  orderId: string;
  medicineId: string;
  sellerId: string;
  quantity: number;
  unit_price: number | string;
  sub_total: number | string;

  order?: IOrderType;
  medicine?: IMedicineType;
  seller?: IUserType;
}

export interface IOrderType {
  id: string;
  customerId: string;
  status: IOrderStatus;
  payment_method: IPaymentMethod;
  shipping_address: string;
  total_amount: number | string;
  createdAt: string | Date;
  updatedAt: string | Date;

  customer?: IUserType;
  items?: IOrderItemType[];

  _count?: {
    items: number;
  };
}

/* export interface ICreateOrderPayload {
  shipping_address: string;
  items: {
    medicineId: string;
    quantity: number;
    sellerId: string;
  }[];
} */

export interface IOrderItemPayload {
  medicineId: string;
  sellerId: string;
  quantity: number;
}

export interface ICreateOrderPayload {
  items: IOrderItemPayload[];
  shipping_address: string;
  total_amount: number;
}

export interface IUpdateOrderStatusPayload {
  status: IOrderStatus;
}

export interface ISellerOrderType {
  id: string;
  medicineId: string;
  orderId: string;
  sellerId: string;
  quantity: number;
  unit_price: string | number;
  sub_total: string | number;

  medicine: {
    name: string;
    image: string;
    price: string | number;
    manufacturer: string;
  };
  order: IViewMedicineOrderDetailsProps;
}

export interface IViewMedicineOrderDetailsProps {
  id: string;
  status: IOrderStatus;
  payment_method: string;
  shipping_address: string;
  total_amount: string | number;
  createdAt: string | Date;
  customer?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface ICustomerOrderType {
  id: string;
  customerId: string;
  status: IOrderStatus;
  payment_method: IPaymentMethod;
  shipping_address: string;
  total_amount: string | number;
  createdAt: string | Date;
  updatedAt: string | Date;
  items: IOrderItemType[];
}
