import { Types } from "mongoose";
import { Dimensions } from "@/types/quote";

export type Order = {
  _id: string;
  product: Types.ObjectId;
  customer: Types.ObjectId;
  address: Types.ObjectId;
  quantity: Number;
  orderNumber: string;
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
    name: string;
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

  subtotal: Number;
  tax: Number;
  total: Number;
  status: "PENDING" | "DELIVERED" | "CANCELLED";
  notes: String;
  createdAt?: Date;
  paymentStatus: "pending" | "partial" | "paid";
  payments: IPayment[]; // array embebido
  amountPaid: Number;
}
