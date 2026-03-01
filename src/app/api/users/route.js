import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcrypt";
import User from "@/models/User";
import connectDB from "@/config/database.js";

export async function POST(req) {
  // const session = await getServerSession(authOptions);

  // if (!session || session.user.role !== "admin") {
  //   return new Response("Unauthorized", { status: 401 });
  // }
  console.log("POST request trial");
  const { name, email, password, role } = await req.json();

  console.log("Connecting to MongoDB");
  await connectDB();

  console.log("Hashing password");
  const hashed = await bcrypt.hash(password, 10);

  console.log("Creating user");
  const newUser = await User.create({
    name,
    email,
    password: hashed,
    role,
  });

  console.log("User created successfully");
  return Response.json(newUser);
}
