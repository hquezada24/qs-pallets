import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import Order from "@/models/Order";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;

    await connectDB();

    const order = await Order.findOne({ orderNumber: id })
      .select("-__v -updatedAt")
      .lean();

    console.log("order: ", order);
    return new Response(JSON.stringify({ order }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/order/:orderNumber error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
