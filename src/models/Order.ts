import { Schema, model, models } from "mongoose";
import { Model } from "mongoose";
import { IOrder, IPayment } from "@/types/order";

const paymentSchema = new Schema<IPayment>({
  amount: { type: Number, required: true },
  method: { type: String, enum: ["cash", "transfer", "check", "other"] },
  reference: { type: String, default: "" },
  notes: { type: String, default: "" },
  paidAt: { type: Date, default: Date.now },
});

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
      fullName: { type: String, required: true },
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
      enum: ["PENDING", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },

    deliveredAt: { type: Date, default: null },
    cancelledAt: { type: Date, default: null },
    cancellationReason: { type: String, default: "" },

    notes: String,
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid"],
      default: "pending",
    },
    payments: [paymentSchema], // array embebido
    amountPaid: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const Order =
  (models.Order as Model<IOrder>) || model<IOrder>("Order", OrderSchema);

export default Order;
