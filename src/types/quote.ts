import { Types } from "mongoose";

export type Quote = {
  _id: string;
  product: Types.ObjectId;
  quantity: number;
  additionalDetails?: string;
  status: "NEW" | "PENDING" | "APPROVED" | "REJECTED";
  customer: Types.ObjectId;
  address: Types.ObjectId;
};
