import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";
import { Model } from "mongoose";
import { Dimensions } from "@/types/quote";

interface Item {
  id: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
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
  status: "PENDING" | "IN_PRODUCTION" | "READY" | "DELIVERED" | "CANCELLED";
  notes: String;
  createdAt?: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, unique: true },
    quote: {
      id: { type: Schema.Types.ObjectId, ref: "Quote" },
      quoteNumber: { type: String },
      customDimensions: {
        length: { type: Number },
        height: { type: Number },
        notes: { type: String },
        weightCapacity: { type: Number },
        width: { type: Number },
      },
    },
    items: [
      {
        _id: false,
        id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    customer: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
      },
      name: { type: String, required: true },
      companyName: { type: String },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },

    delivery: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
      type: { type: String, enum: ["DELIVERY", "PICKUP"], default: "DELIVERY" },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      scheduledDate: { type: Date },
    }, // Needed on input
    subtotal: Number,
    tax: { type: Number, default: 0 },
    total: Number,
    status: {
      type: String,
      enum: ["PENDING", "IN_PRODUCTION", "READY", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },

    notes: String,
  },
  {
    timestamps: true,
  },
);

const Order =
  (models.Order as Model<IOrder>) || model<IOrder>("Order", OrderSchema);

export default Order;
