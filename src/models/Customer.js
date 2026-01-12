import { Schema, model, models } from "mongoose";

const CustomerSchema = new Schema(
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
  }
);

const Customer = models.Customer || model("Customer", CustomerSchema);

export default Customer;
