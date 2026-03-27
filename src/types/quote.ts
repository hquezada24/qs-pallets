import { Types } from "mongoose";

export type Quote = {
  _id: string;
  product: Types.ObjectId;
  quantity: number;
  additionalDetails?: string;
  status: "PENDING" | "APPROVED" | "SOLVED";
  customer: Types.ObjectId;
  quoteNumber: string;
};

type Dimensions = {
  height: number;
  length: number;
  notes: string;
  weightCapacity: number;
  width: number;
};

interface QuoteItem {
  id: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface IQuote {
  items: QuoteItem[];

  customer: {
    id: Types.ObjectId;
    name: string;
    companyName?: string;
    phone: string;
    email: string;
  };

  additionalDetails?: string;

  status: "PENDING" | "APPROVED" | "SOLVED";

  customDimensions?: Dimensions;

  total?: number;
  createdAt?: Date;
  updatedAt?: Date;
  quoteNumber: string;
}
