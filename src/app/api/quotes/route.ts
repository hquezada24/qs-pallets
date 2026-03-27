import { NextRequest, NextResponse } from "next/server";
import Quote from "@/models/Quote";
import Customer from "@/models/Customer";

import connectDB from "@/config/database";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const quotesObj = await Quote.find()
      .select("_id customer address createdAt status quoteNumber")
      .lean();

    const quotes = await Promise.all(
      quotesObj.map(async (quote) => {
        const customer = await Customer.findById(quote.customer.id).select(
          "fullName companyName email phone -_id",
        );

        return {
          _id: quote._id,
          status: quote.status,
          createdAt: quote.createdAt,
          fullName: customer?.fullName,
          companyName: customer?.companyName || "",
          email: customer?.email,
          phone: customer?.phone,
          actions: `/quotes/${quote._id}`,
          quoteNumber: quote.quoteNumber,
        };
      }),
    );

    return new Response(JSON.stringify({ quotes }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/quotes error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
