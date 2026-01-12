import { Schema, model, models } from "mongoose";

const QuoteSchema = new Schema(
  {
    palletType: {
      type: String,
      enum: ["STANDARD", "RECYCLED", "CUSTOM"],
      required: true,
    },
    quantity: {
      type: String,
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
  }
);

const Quote = models.Quote || model("Quote", QuoteSchema);

export default Quote;
