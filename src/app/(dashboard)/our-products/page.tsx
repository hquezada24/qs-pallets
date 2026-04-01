"use client";
import Table from "@/components/Table";
import Form from "@/components/Form";
import { apiRequest } from "@/lib/apiRequest";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { useApiQuery } from "@/hooks/useApiQuery";
import TableSkeleton from "@/components/TableSkeleton";
import StockModal from "@/components/StockModal";

type ProductsResponse = {
  products: Product[];
};

const Products = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const {
    data: products,
    loading,
    error,
    refetch,
  } = useApiQuery<ProductsResponse>("/api/our-products", {
    deps: [submitStatus],
    enabled: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    {
      key: "price",
      header: "Price",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    { key: "icon", header: "Icon" },
    { key: "stockTotal", header: "Available" },
    { key: "stockReserved", header: "Reserved" },
    {
      key: "",
      header: "Add Stock",
      render: (_: unknown, row: Product) =>
        !row.isCustom ? (
          <div className="flex justify-center w-full">
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-green-50 text-green-600 font-bold text-lg hover:bg-green-100 hover:text-green-700 transition-colors duration-150 cursor-pointer"
              onClick={() => setSelectedProduct(row)}
            >
              +
            </button>
          </div>
        ) : (
          <div className="flex justify-center w-full">—</div>
        ),
    },
  ];

  useEffect(() => {
    if (!submitStatus) return;

    const delay = submitStatus === "success" ? 1500 : 4000;
    const timer = setTimeout(() => {
      setSubmitStatus(null);
      if (submitStatus === "success") setForm(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [submitStatus]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center gap-8">
      {/* Table section */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden px-2 py-4">
        {loading && <TableSkeleton />}

        {error && (
          <div className="mx-6 my-4 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <Table
            title={"Products"}
            columns={orderColumns}
            data={products.products}
            keyField={"name"}
          />
        )}
        {selectedProduct && (
          <StockModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onSuccess={async () => {
              setSelectedProduct(null);
              await refetch();
              // refreshProducts(); // o router.refresh() si usas Server Components
            }}
          />
        )}
      </div>

      {/* Form section */}
      <div className="w-full max-w-3xl flex flex-col items-center gap-4">
        <button
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-sm transition-all duration-150 cursor-pointer"
          onClick={() => setForm(!form)}
        >
          {form ? (
            <>
              <span>✕</span> Close Form
            </>
          ) : (
            <>
              <span>＋</span> Add New Product
            </>
          )}
        </button>

        {/* Status messages */}
        {submitStatus === "error" && (
          <div className="w-full flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            <span>✕</span>
            <span>Could not create new product. Please try again.</span>
          </div>
        )}
        {submitStatus === "success" && (
          <div className="w-full flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
            <span>✓</span>
            <span>Product created successfully!</span>
          </div>
        )}

        {/* Form container */}
        {form && (
          <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-5">
              New Product
            </h2>
            <Form
              inputs={FormData}
              submitType={isSubmitting ? "Adding product..." : "Add Product"}
              path="our-products"
              setIsSubmitting={setIsSubmitting}
              setSubmitStatus={setSubmitStatus}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
