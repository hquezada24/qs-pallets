import { Types } from "mongoose";

export type Order = {
  _id: string;
  product: Types.ObjectId;
  customer: Types.ObjectId;
  address: Types.ObjectId;
  quantity: Number;
};
