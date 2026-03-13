import { Schema, model, models } from "mongoose";
import { Model } from "mongoose";

interface ICustomer {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
}

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
  },
  {
    timestamps: true,
  },
);

const Customer =
  (models.Customer as Model<ICustomer>) ||
  model<ICustomer>("Customer", CustomerSchema);

export default Customer;
