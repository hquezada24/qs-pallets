import { Schema, model, models } from "mongoose";

interface IProduct {
  name: string;
  index_page_description: string;
  description: string;
  price: number;
  imageURL?: string[];
  icon: string;
  isCustom: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    index_page_description: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageURL: {
      type: [String],
      default: [],
      required: false,
    },
    icon: {
      type: String,
      required: true,
    },
    isCustom: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Product = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
