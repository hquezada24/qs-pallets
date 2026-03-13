import { NextRequest, NextResponse } from "next/server";
import Quote from "@/models/Quote";
import Address from "@/models/Address";
import Customer from "@/models/Customer";

import connectDB from "@/config/database";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const quotesObj = await Quote.find()
      .select("-createdAt -updatedAt -__v")
      .lean();

    const quotes = await Promise.all(
      quotesObj.map(async (quote) => {
        const city = await Address.findById(quote.address).select("city -_id");
        const customer = await Customer.findById(quote.customer).select(
          "fullName email phone -_id",
        );

        return {
          ...quote,
          city: city?.city,
          fullName: customer?.fullName,
          phone: customer?.phone,
          email: customer?.email,
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
