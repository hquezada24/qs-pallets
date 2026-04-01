import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import Order from "@/models/Order";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const body = await req.json();

    await connectDB();

    console.log(body);

    await Order.updateOne(
      { orderNumber: id },
      {
        $set: { status: body.status },
        $currentDate: { lastModified: true },
      },
    );

    const status = await Order.findOne({ orderNumber: id }).select("status");

    return new Response(JSON.stringify({ status }), {
      status: 200,
    });
  } catch (error) {
    console.error("PATCH /api/orders/:id/status error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;

    await connectDB();

    const status = await Order.findById(id).select("status");

    return new Response(JSON.stringify({ status }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/orders/:id/status error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
