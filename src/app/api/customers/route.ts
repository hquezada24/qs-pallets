import { NextRequest } from "next/server";
import Customer from "@/models/Customer";
import connectDB from "@/config/database";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const customers = await Customer.find().select("-__v -createdAt").lean();

    return new Response(JSON.stringify({ customers }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/customers error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
