import connectDB from "../../../../config/database.js";
import Customer from "@/models/Customer";
import Quote from "@/models/Quote";
import Address from "@/models/Address";

// POST /api/quote
export const POST = async (request) => {
  try {
    await connectDB();

    const body = await request.json();

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

    // Fetch address from DB
    let customerAddress = await Address.findOne({
      street: body.address.street,
      city: body.address.city,
      state: body.address.state,
      zipCode: body.address.zipCode,
    });

    // Create and save Address if it doesn't exist
    if (!customerAddress) {
      const addressData = {
        street: body.address.street,
        city: body.address.city,
        state: body.address.state,
        zipCode: body.address.zipCode,
      };
      const newAddress = await Address.create(addressData);
      customerAddress = newAddress;
    }

    // Create and save Quote with customer and address references
    console.log(body);
    const quoteData = {
      items: body.items.map(({ _id, ...rest }) => ({
        id: _id,
        ...rest,
      })),
      additionalDetails: body.additionalDetails,
      customDimensions: {
        length: Number(body.customDimensions.length),
        width: Number(body.customDimensions.width),
        height: Number(body.customDimensions.height),
        weightCapacity: Number(body.customDimensions.weightCapacity),
        notes: body.customDimensions.notes,
      },
      customer: {
        id: customer._id,
        name: customer.fullName,
        phone: customer.phone,
      },
      address: {
        id: customerAddress._id,
        street: customerAddress.street,
        city: customerAddress.city,
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
