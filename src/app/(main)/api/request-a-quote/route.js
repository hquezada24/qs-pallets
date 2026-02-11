import connectDB from "../../../../config/database";
import Customer from "@/models/Customer";
import Quote from "@/models/Quote";
import Address from "@/models/Address";

// POST /api/quote
export const POST = async (request) => {
  try {
    await connectDB();

    const body = await request.json();

    const customerEmail = await Customer.findOne({
      email: body.email,
    });

    if (customerEmail !== null) {
      return new Response(
        JSON.stringify({ message: "Customer already exists" }),
        { status: 400 } // Changed to 400 for bad request
      );
    }

    const customerAddress = await Address.findOne({
      street: body.address.street,
      city: body.address.city,
      state: body.address.state,
      zipCode: body.address.zipCode,
    });

    if (customerAddress !== null) {
      return new Response(
        JSON.stringify({ message: "Address is already registered" }),
        { status: 400 } // Changed to 400 for bad request
      );
    }

    // Create and save Address first
    const addressData = {
      street: body.address.street,
      city: body.address.city,
      state: body.address.state,
      zipCode: body.address.zipCode,
    };
    const newAddress = new Address(addressData);
    await newAddress.save();

    // Create and save Customer with address reference
    const customerData = {
      fullName: body.fullName,
      companyName: body.companyName || "",
      email: body.email,
      phone: body.phone,
      address: newAddress._id, // Add address reference
    };
    const newCustomer = new Customer(customerData);
    await newCustomer.save();

    // Create and save Quote with customer and address references
    const quoteData = {
      palletType: body.palletType,
      quantity: body.quantity,
      additionalDetails: body.additionalDetails,
      customer: newCustomer._id, // Add customer reference
      address: newAddress._id, // Add address reference
    };
    const newQuote = new Quote(quoteData);
    await newQuote.save();

    return new Response(
      JSON.stringify({
        message: "Quote created successfully",
        quoteId: newQuote._id,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Something went wrong:", error);
    return new Response(
      JSON.stringify({ message: "Failed to register quote" }),
      { status: 500 }
    );
  }
};
