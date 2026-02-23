import { Schema, model, models } from "mongoose";

const QuoteSchema = new Schema(
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

const Quote = models.Quote || model("Quote", QuoteSchema);

export default Quote;
