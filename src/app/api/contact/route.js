import connectDB from "../../../../config/database";
import Customer from "@/models/Customer";
import Message from "@/models/Message";

// GET /api/contact
export const GET = (request) => {
  return new Response(
    JSON.stringify({
      address: {
        street: "1415 FM 2216",
        city: "Honey Grove",
        state: "TX",
        zipCode: "75446",
        formatted: "1415 FM 2216\nHoney Grove, TX 75446",
      },
      phone: {
        display: "(903) 401-0536",
        href: "tel:+19034010536",
      },
      email: {
        display: "info@qspallets.com",
        href: "mailto:info@qspallets.com",
      },
      businessHours: {
        weekdays: "Monday - Friday: 7:00 AM - 6:00 PM",
        saturday: "Saturday: 8:00 AM - 4:00 PM",
        sunday: "Sunday: Closed",
      },
    }),
    { status: 200 }
  );
};

// POST /api/contact
export const POST = async (request) => {
  try {
    await connectDB();

    const body = await request.json();

    let customer = await Customer.findOne({
      email: body.email,
    });

    if (!customer) {
      const customerData = {
        fullName: body.fullName,
        companyName: body.companyName || "",
        email: body.email,
        phone: body.phone,
      };

      const newCustomer = new Customer(customerData);
      await newCustomer.save();

      customer = newCustomer;
    }

    const messageData = {
      subject: body.subject,
      message: body.message,
      customer: customer._id,
    };

    const newMessage = new Message(messageData);
    newMessage.save();

    return new Response(
      JSON.stringify({
        message: "Message sent successfully",
        messageId: newMessage._id,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Something went wrong: ", error);
    return new Response(JSON.stringify({ message: "Failed to send message" }), {
      status: 500,
    });
  }
};
