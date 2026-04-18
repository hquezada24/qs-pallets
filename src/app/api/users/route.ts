import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcrypt";
import User from "@/models/User";
import connectDB from "@/config/database.js";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const users = await User.find().select("-password -__v");

    return new Response(JSON.stringify({ users }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/users error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    // const session = await getServerSession(authOptions);

    // if (!session || session.user.role !== "admin") {
    //   return new Response("Unauthorized", { status: 401 });
    // }

    const { name, email, password, role } = await req.json();

    await connectDB();

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    console.log("User created successfully");
    return new Response(JSON.stringify({ newUser }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
