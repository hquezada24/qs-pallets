import { Schema, model, models } from "mongoose";
import { Model } from "mongoose";
import { ICustomer, IAddress } from "@/types/customer";

const AddressSchema = new Schema<IAddress>(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["TX", "AR", "OK"],
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

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
      type: [AddressSchema],
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
