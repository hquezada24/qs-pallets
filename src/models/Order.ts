import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";
import { Model } from "mongoose";

interface IOrder {
  customer: Types.ObjectId;
  product: Types.ObjectId;
  address: Types.ObjectId;
  quantity: number;
}

const OrderSchema = new Schema<IOrder>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order =
  (models.Order as Model<IOrder>) || model<IOrder>("Order", OrderSchema);

export default Order;
