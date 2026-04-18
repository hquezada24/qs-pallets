import { NextRequest } from "next/server";
import Customer from "@/models/Customer";
import connectDB from "@/config/database";

const ALLOWED_FIELDS = ["fullName", "phone", "email"] as const;
type Field = (typeof ALLOWED_FIELDS)[number];

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";
    const field = searchParams.get("field") ?? "fullName";

    if (!ALLOWED_FIELDS.includes(field as Field)) {
      return Response.json({ message: "Invalid Field" }, { status: 400 });
    }

    await connectDB();

    if (q && field) {
      const customers = await Customer.find({
        [field]: { $regex: q, $options: "i" },
      })
        .limit(10)
        .select("-__v")
        .lean();

      return new Response(JSON.stringify({ customers }), {
        status: 200,
      });
    }

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
