import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import Product from "@/models/Product";
import { model } from "mongoose";
import { Schema } from "mongoose";

export const POST = async (req: NextRequest) => {
  try {
    const { name, index, description, price, url, icon, isCustom } =
      await req.json();

    await connectDB();

    const newProduct = await Product.create({
      name,
      index_page_description: index,
      description,
      price,
      imageURL: url,
      icon,
      isCustom: Boolean(isCustom),
    });

    console.log("Product created successfully");
    return new Response(JSON.stringify({ newProduct }), {
      status: 200,
    });
  } catch (error) {
    console.error("POST /api/our-products error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    console.log("Accessing the db");
    const products = await Product.find().select("name price icon");

    console.log("Returning response");
    return new Response(JSON.stringify({ products }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/our-products error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
