import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
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
  },
  {
    timestamps: true,
  },
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
