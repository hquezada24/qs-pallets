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

    const subtotal: string = body.items
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

    const tax: string = body.taxRate
      ? (parseFloat(subtotal) * parseFloat(body.taxRate)).toFixed(2)
      : parseFloat(subtotal).toFixed(2);

    console.log(body);

    const orderData = {
      items: body.items.map(({ _id, ...rest }) => ({
        id: _id,
        ...rest,
      })),
      orderNumber: orderNumber,
      quote: {
        id: body.id,
        quoteNumber: body.quoteNumber,
        customDimensions: body.customDimensions,
      },
      delivery: address
        ? {
            id: address._id,
            type: body.deliveryType,
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            scheduledDate: body.deliveryDate,
          }
        : {
            type: body.deliveryType,
          },
      customer: {
        id: customer._id,
        name: customer.fullName,
        companyName: customer.companyName || "",
        phone: customer.phone,
        email: customer.email,
      },
      subtotal: parseFloat(subtotal),
      tax: parseFloat(tax),
      total: parseFloat(subtotal) + parseFloat(tax),
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

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const ordersObj = await Order.find().populate("customer").lean();

    const orders = ordersObj.map((order) => ({
      // customer flatten
      customerName: order.customer?.name,
      email: order.customer?.email,
      phone: order.customer?.phone,

      // address flatten
      deliveryType: order.delivery.type,
      street: order.delivery?.street,
      city: order.delivery?.city,
      zipCode: order.delivery?.zipCode,
      actions: `/orders/${order.orderNumber}`,
      ...order,
    }));

    return new Response(JSON.stringify({ orders }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/orders error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
