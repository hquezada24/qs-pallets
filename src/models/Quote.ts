import { Schema, model, models, Types } from "mongoose";
import { Model } from "mongoose";
import { IQuote } from "@/types/quote";

const QuoteSchema = new Schema<IQuote>(
  {
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

    address: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true,
      },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },

    additionalDetails: {
      type: String,
    },

    status: {
      type: String,
      enum: ["NEW", "PENDING", "APPROVED", "REJECTED"],
      default: "NEW",
    },

    customDimensions: {
      height: { type: Number },
      length: { type: Number },
      notes: { type: String },
      weightCapacity: { type: Number },
      width: { type: Number },
    },

    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Quote =
  (models.Quote as Model<IQuote>) || model<IQuote>("Quote", QuoteSchema);

export default Quote;
