import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import Quote from "@/models/Quote";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const body = await req.json();

    await connectDB();

    await Quote.updateOne(
      { _id: id },
      {
        $set: { status: body.status },
        $currentDate: { lastModified: true },
      },
    );

    const status = await Quote.findById(id).select("status");

    return new Response(JSON.stringify({ status }), {
      status: 200,
    });
  } catch (error) {
    console.error("PATCH /api/quote/:id/status error:", error);

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

    const status = await Quote.findById(id).select("status");

    return new Response(JSON.stringify({ status }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/quote/:id/status error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
