import { Schema } from "mongoose";
import { models } from "mongoose";
import { Model } from "mongoose";
import { model } from "mongoose";
import { IStockMovement } from "@/types/stockMovements";

const StockMovementSchema = new Schema<IStockMovement>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  orderId: { type: Schema.Types.ObjectId, ref: "Order" }, // opcional, si viene de una orden
  type: {
    type: String,
    enum: [
      "stock_in", // compraste/fabricaste unidades
      "reserved", // orden creada
      "unreserved", // orden cancelada
      "fulfilled", // orden entregada → sale del stock real
      "adjustment", // corrección manual
    ],
    required: true,
  },
  quantity: { type: Number, required: true }, // positivo o negativo
  notes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const StockMovement =
  (models.StockMovement as Model<IStockMovement>) ||
  model<IStockMovement>("StockMovement", StockMovementSchema);

export default StockMovement;
