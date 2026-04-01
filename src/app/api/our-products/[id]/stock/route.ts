import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import Product from "@/models/Product";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const body = await req.json();
    const { id } = await params;

    await connectDB();

    await Product.updateOne(
      { _id: id },
      {
        $set: { notes: body.notes },
        $inc: { stockTotal: body.quantity },
        $currentDate: { lastModified: true },
      },
    );

    const product = await Product.findOne({ _id: id } as any);

    return new Response(JSON.stringify({ product }), {
      status: 200,
    });
  } catch (error) {
    console.error("PATCH /api/our-products/:id/stock error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
