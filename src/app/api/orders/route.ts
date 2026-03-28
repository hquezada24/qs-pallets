import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import { getNextSequenceNumber } from "@/lib/getNextSequenceNumber";
import Order from "@/models/Order";
import Customer from "@/models/Customer";
import Address from "@/models/Address";
import { QuoteItem } from "@/types/quote";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();
    const orderNumber = await getNextSequenceNumber("orderNumber", "O");

    // Fetch customer from DB
    let customer = await Customer.findOne({
      email: body.customer.email,
    });

    // Create and save Customer if it doesn't exist
    if (!customer) {
      const customerData = {
        fullName: body.customer.fullName,
        companyName: body.customer.companyName || "",
        email: body.customer.email,
        phone: body.customer.phone,
      };
      const newCustomer = await Customer.create(customerData);
      customer = newCustomer;
    }

    // Fetch customer from DB
    let address = await Address.findOne({
      street: body.street,
      city: body.city,
      state: body.state,
      zipCode: body.zipCode,
    });

    // Create and save Customer if it doesn't exist
    if (!address && body.street && body.city && body.state && body.zipCode) {
      console.log("Creating address");
      const addressData = {
        street: body.street,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
      };
      const newAddress = await Address.create(addressData);
      address = newAddress;
    }

    const subtotal = body.items
      .map((item: QuoteItem) => {
        return item.isCustom
          ? item.quantity * parseFloat(body.customPalletCost)
          : item.quantity * item.price;
      })
      .reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0,
      )
      .toFixed(2);

    const tax = subtotal * body.taxRate;

    const orderData = {
      items: body.items.map(({ _id, ...rest }) => ({
        id: _id,
        ...rest,
      })),
      orderNumber: orderNumber,
      quote: {
        id: body.id,
        quoteNumber: body.quoteNumber,
      },
      delivery: address
        ? {
            id: address._id,
            type: body.type,
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            scheduledDate: body.deliveryDate,
          }
        : {},
      customer: {
        id: customer._id,
        name: customer.fullName,
        companyName: customer.companyName || "",
        phone: customer.phone,
        email: customer.email,
      },
      subtotal: subtotal,
      tax: tax,
      total: subtotal + tax,
      notes: body.internalNotes,
    };

    await Order.create(orderData);

    return new Response(
      JSON.stringify({
        message: "Order created successfully",
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Something went wrong:", error);
    return new Response(
      JSON.stringify({ message: "Failed to register order" }),
      { status: 500 },
    );
  }
};
