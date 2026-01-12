import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "SENT"],
      default: "PENDING",
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
