import { Schema, model, models, Types } from "mongoose";
import { Model } from "mongoose";

type Dimensions = {
  height: string;
  length: string;
  notes: string;
  weightCapacity: string;
  width: string;
};

export interface IQuote {
  items: {
    id: Types.ObjectId;
    quantity?: number;
  }[];

  customer: {
    id: Types.ObjectId;
    name: string;
    phone?: string;
  };

  address: {
    id: Types.ObjectId;
    street: string;
    city: string;
  };

  additionalDetails?: string;

  status: "NEW" | "PENDING" | "APPROVED" | "REJECTED";

  customDimensions?: Dimensions;

  total?: number;
}

const QuoteSchema = new Schema<IQuote>(
  {
    items: [
      {
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
      phone: { type: String },
    },

    address: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true,
      },
      street: { type: String, required: true },
      city: { type: String, required: true },
    },

    additionalDetails: {
      type: String,
    },

    status: {
      type: String,
      enum: ["NEW", "PENDING", "APPROVED", "REJECTED"],
      default: "NEW",
    },

    customDimensions: {},

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
