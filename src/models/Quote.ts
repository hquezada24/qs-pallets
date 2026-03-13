import { Schema, model, models, Types } from "mongoose";
import { Model } from "mongoose";

export interface IQuote {
  product: Types.ObjectId;
  quantity: number;
  additionalDetails?: string;
  status: "NEW" | "PENDING" | "APPROVED" | "REJECTED";
  customer: Types.ObjectId;
  address: Types.ObjectId;
}

const QuoteSchema = new Schema<IQuote>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    additionalDetails: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["NEW", "PENDING", "APPROVED", "REJECTED"],
      default: "NEW",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Quote =
  (models.Quote as Model<IQuote>) || model<IQuote>("Quote", QuoteSchema);

export default Quote;
