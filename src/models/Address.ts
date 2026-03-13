import { Schema, model, models } from "mongoose";
import { Model } from "mongoose";

interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

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

const Address =
  (models.Address as Model<IAddress>) ||
  model<IAddress>("Address", AddressSchema);

export default Address;
