import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  role: "employee" | "admin";
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
