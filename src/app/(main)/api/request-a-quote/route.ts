import connectDB from "../../../../config/database.js";
import Customer from "@/models/Customer";
import Quote from "@/models/Quote";
import { getNextSequenceNumber } from "@/lib/getNextSequenceNumber";

// POST /api/quote
export const POST = async (request) => {
  try {
    await connectDB();

    const body = await request.json();
    const quoteNumber = await getNextSequenceNumber("quoteNumber", "Q");

    // Fetch customer from DB
    let customer = await Customer.findOne({
      email: body.email,
    });

    // Create and save Customer if it doesn't exist
    if (!customer) {
      const customerData = {
        fullName: body.fullName,
        companyName: body.companyName || "",
        email: body.email,
        phone: body.phone,
      };
      const newCustomer = await Customer.create(customerData);
      customer = newCustomer;
    }

    // Create and save Quote with customer reference
    const quoteData = {
      items: body.items.map(({ _id, ...rest }) => ({
        id: _id,
        ...rest,
      })),
      additionalDetails: body.additionalDetails,
      quoteNumber: quoteNumber,
      customDimensions: body.customDimensions
        ? {
            length: Number(body.customDimensions.length),
            width: Number(body.customDimensions.width),
            height: Number(body.customDimensions.height),
            weightCapacity: Number(body.customDimensions.weightCapacity),
            notes: body.customDimensions.notes,
          }
        : {},
      customer: {
        id: customer._id,
        name: customer.fullName,
        companyName: customer.companyName || "",
        phone: customer.phone,
        email: customer.email,
      },
    };
    const newQuote = await Quote.create(quoteData);

    return new Response(
      JSON.stringify({
        message: "Quote created successfully",
        quoteId: newQuote._id,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Something went wrong:", error);
    return new Response(
      JSON.stringify({ message: "Failed to register quote" }),
      { status: 500 },
    );
  }
};
