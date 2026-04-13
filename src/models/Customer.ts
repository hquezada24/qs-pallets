import { Schema, model, models } from "mongoose";
import { Model } from "mongoose";
import Address from "./Address";
import { ICustomer } from "@/types/customer";

const CustomerSchema = new Schema<ICustomer>(
  {
    fullName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    addresses: {
      type: [Address],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Customer =
  (models.Customer as Model<ICustomer>) ||
  model<ICustomer>("Customer", CustomerSchema);

export default Customer;
