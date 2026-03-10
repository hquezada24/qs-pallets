"use client";
import Table from "@/components/Table";
import Form from "@/components/Form";
import { apiRequest } from "@/lib/apiRequest";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";

type ProductsResponse = {
  products: Product[];
};

const Products = () => {
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const FormData = [
    { key: "name", label: "Name", type: "text" },
    { key: "index", label: "Index Page Description", type: "textarea" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "price", label: "Price", type: "text" },
    { key: "url", label: "Image URL String", type: "text" },
    { key: "icon", label: "Icon", type: "text" },
    {
      key: "isCustom",
      label: "Is This A Custom Product?",
      type: "radio",
      options: [
        { key: "yes", label: "Yes", value: "true" },
        { key: "no", label: "No", value: "" },
      ],
    },
  ];

  const orderColumns = [
    { key: "name", header: "Name" },
    { key: "price", header: "Price" },
    { key: "icon", header: "Icon" },
    { key: "see", header: "" },
  ];

  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);

      const res = await apiRequest("/api/our-products");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: ProductsResponse = await res.json();

      setProducts(data);
    } catch (error) {
      setError(error.message);
      console.error("Product fetching error: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [submitStatus]);

  return (
    <div className="p-8 flex flex-col sm:flex-row justify-evenly space-y-4">
      <div className="">
        {loading && <p>Loading products...</p>}

        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <Table
            title={"Products"}
            columns={orderColumns}
            data={products.products}
          />
        )}
      </div>
      <div className="flex flex-col justify-center items-center min-w-md">
        <h2 className="mb-3">Add a New Product</h2>
        {submitStatus === "error" && (
          <h3 className="text-red-500 ">Could Not Create New Product!</h3>
        )}
        {submitStatus === "success" && (
          <h3 className="text-green-500 ">Product created successfully!</h3>
        )}
        <Form
          inputs={FormData}
          submitType={isSubmitting ? "Adding product..." : "Add Product"}
          path="our-products"
          setIsSubmitting={setIsSubmitting}
          setSubmitStatus={setSubmitStatus}
        />
      </div>
    </div>
  );
};

export default Products;
