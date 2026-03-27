import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import { getNextSequenceNumber } from "@/lib/getNextSequenceNumber";
import Order from "@/models/Order";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();
    const orderNumber = await getNextSequenceNumber("orderNumber", "O");

    const order = await Order.create();

    return new Response(
      JSON.stringify({
        message: "Order created successfully",
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Something went wrong:", error);
    return new Response(
      JSON.stringify({ message: "Failed to register order" }),
      { status: 500 },
    );
  }
};
