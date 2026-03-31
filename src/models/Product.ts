import { Schema, model, models } from "mongoose";
import { IProduct } from "@/types/product";

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
    stockTotal: { type: Number, default: 0 },
    stockReserved: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const Product = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
