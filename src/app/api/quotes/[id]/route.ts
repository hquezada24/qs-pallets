import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import Quote from "@/models/Quote";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;

    await connectDB();

    const quote = await Quote.findById(id).select("-__v -updatedAt");

    return new Response(JSON.stringify({ quote }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/quote/:id error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
