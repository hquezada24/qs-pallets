import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import { getNextSequenceNumber } from "@/lib/getNextSequenceNumber";
import Order from "@/models/Order";
import Customer from "@/models/Customer";
import Address from "@/models/Address";
import { QuoteItem } from "@/types/quote";
import { OrderData } from "@/types/order";
import { Types } from "mongoose";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();
    const orderNumber = await getNextSequenceNumber("orderNumber", "O");

    const hasDeliveryAddress =
      body.deliveryType === "DELIVERY" &&
      body.street &&
      body.city &&
      body.state &&
      body.zipCode;

    // Find or create address only when this is a delivery with full address data
    let address = null;

    if (hasDeliveryAddress) {
      address = await Address.findOne({
        street: body.street,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
      });

      if (!address) {
        address = await Address.create({
          street: body.street,
          city: body.city,
          state: body.state,
          zipCode: body.zipCode,
        });
      }
    }

    // Find customer
    let customer = await Customer.findOne({
      email: body.email || body.customer?.email,
    });

    // Create customer if it doesn't exist
    if (!customer) {
      customer = await Customer.create({
        fullName: body.fullName || body.customer?.fullName,
        companyName: (body.companyName || body.customer?.companyName) ?? "",
        email: body.email || body.customer?.email,
        phone: body.phone || body.customer?.phone,
        addresses:
          hasDeliveryAddress && address
            ? [
                {
                  street: address.street,
                  city: address.city,
                  state: address.state,
                  zipCode: address.zipCode,
                },
              ]
            : [],
      });
    }

    // If customer exists and this delivery address is new, append it
    if (customer && hasDeliveryAddress && address) {
      const addressExists = customer.addresses.some(
        (addr) =>
          addr?.street === address.street &&
          addr?.city === address.city &&
          addr?.state === address.state &&
          addr?.zipCode === address.zipCode,
      );

      if (!addressExists) {
        customer.addresses.push({
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
        });

        await customer.save();
      }
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
      : "0.00";

    const orderData: OrderData = {
      items: body.items.map(({ _id, ...rest }) => ({
        id: _id,
        ...rest,
      })),
      orderNumber,
      quote: {
        id: new Types.ObjectId(body.id),
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
        fullName: customer.fullName,
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
    const status = req.nextUrl.searchParams.get("status");

    const query = status ? { status } : {};

    await connectDB();

    const ordersObj = await Order.find(query).populate("customer").lean();

    const orders = ordersObj.map((order) => ({
      // customer flatten
      fullName: order.customer?.fullName,
      email: order.customer?.email,
      phone: order.customer?.phone,

      // address flatten
      deliveryType: order.delivery.type,
      street: order.delivery?.street,
      city: order.delivery?.city,
      zipCode: order.delivery?.zipCode,
      actions: `/dashboard/orders/${order.orderNumber}`,
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
