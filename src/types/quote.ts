import { Types } from "mongoose";

export type Quote = {
  _id: string;
  product: Types.ObjectId;
  quantity: number;
  additionalDetails?: string;
  status: "NEW" | "PENDING" | "APPROVED" | "REJECTED";
  customer: Types.ObjectId;
  address: Types.ObjectId;
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

  address: {
    id: Types.ObjectId;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };

  additionalDetails?: string;

  status: "NEW" | "PENDING" | "APPROVED" | "REJECTED";

  customDimensions?: Dimensions;

  total?: number;
  createdAt?: Date;
  updatedAt?: Date;
  quoteNumber: string;
}
