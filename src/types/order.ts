import { Types } from "mongoose";
import { Dimensions } from "@/types/quote";

export type Order = {
  _id: string;
  product: Types.ObjectId;
  customer: Types.ObjectId;
  address: Types.ObjectId;
  quantity: number;
  orderNumber: string;
  fullName?: string;
  phone?: string;
  deliveryType?: string;
  total?: string;
  status?: string;
  actions?: string;
};

interface Item {
  id: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface IPayment {
  id: Types.ObjectId;
  amount: number;
  method: "cash" | "transfer" | "check" | "other";
  reference: string;
  notes?: string;
  paidAt: Date;
}

export interface IOrder {
  orderNumber: string;
  quote: {
    id: Types.ObjectId;
    quoteNumber: string;
    customDimensions: Dimensions;
  };
  items: Item[];
  customer: {
    id: Types.ObjectId;
    fullName: string;
    companyName?: string;
    phone: string;
    email: string;
  };

  delivery?: {
    id: Types.ObjectId;
    type: "DELIVERY" | "PICKUP";
    street: string;
    city: string;
    state: string;
    zipCode: string;
    scheduledDate: Date;
  };

  subtotal: number;
  tax: number;
  total: number;
  status: "PENDING" | "DELIVERED" | "CANCELLED";
  notes: string;
  createdAt?: Date;
  deliveredAt: Date;
  cancelledAt: Date;
  cancellationReason: string;
  paymentStatus: "pending" | "partial" | "paid";
  payments: IPayment[]; // array embebido
  amountPaid: number;
}

export interface OrderData {
  items: Item[];
  orderNumber: string;
  quote: {
    id: Types.ObjectId;
    quoteNumber: string;
    customDimensions: Dimensions;
  };
  delivery: {
    id?: Types.ObjectId;
    type: "DELIVERY" | "PICKUP";
    street?: string;
    city?: string;
    state?: "TX" | "OK" | "AR";
    zipCode?: string;
    scheduledDate?: Date;
  };
  customer: {
    id: Types.ObjectId;
    fullName: string;
    companyName: string;
    phone: string;
    email: string;
  };
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
}
