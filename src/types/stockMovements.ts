import { Types } from "mongoose";

export interface IStockMovement {
  productId: Types.ObjectId;
  orderId: Types.ObjectId;
  type: "stock_in" | "reserved" | "unreserved" | "fulfilled" | "adjustment";
  quantity: number;
  notes?: string;
  createdAt: Date;
}
