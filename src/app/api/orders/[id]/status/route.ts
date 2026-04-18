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
    const { status } = body;

    await connectDB();

    const $set: Record<string, unknown> = { status };
    const $unset: Record<string, 1> = {};

    if (status === "DELIVERED") {
      $set.deliveredAt = new Date();
      $unset.cancelledAt = 1;
    } else if (status === "CANCELLED") {
      $set.cancelledAt = new Date();
      $unset.deliveredAt = 1;
    } else if (status === "PENDING") {
      // Reverting — clear both dates
      $unset.deliveredAt = 1;
      $unset.cancelledAt = 1;
    }

    await Order.updateOne(
      { orderNumber: id },
      {
        $set,
        ...(Object.keys($unset).length > 0 && { $unset }),
      },
    );

    const updated = await Order.findOne({ orderNumber: id }).select("status");

    return new Response(JSON.stringify({ updated }), {
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

    const status = await Order.findOne({ orderNumber: id }).select("status");

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
