"use client";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import Table, { Column } from "@/components/Table";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { Order } from "@/types/order";
import TableSkeleton from "@/components/TableSkeleton";
import StatusDropdown from "@/components/StatusDropdown";
import Form from "@/components/Form";
import SearchCustomer from "@/components/SearchCustomer";

type OrdersResponse = {
  orders: Order[];
};

const Orders = () => {
  const [orders, setOrders] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [form, setForm] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSearchCustomer, setResetSearchCustomer] = useState(0);

  const isEmpty = Object.keys(customer || {}).length === 0;

  const FormData = [
    !searchCustomer &&
      isEmpty && { key: "fullName", label: "Full Name", type: "text" },
    !searchCustomer &&
      isEmpty && { key: "companyName", label: "Company Name", type: "text" },
    !searchCustomer &&
      isEmpty && { key: "phone", label: "Phone", type: "number" },
    !searchCustomer &&
      isEmpty && { key: "email", label: "Email", type: "email" },

    { key: "deliveryDate", label: "Delivery Date", type: "date" },
    {
      key: "deliveryType",
      label: "Delivery Type",
      type: "select",
      default: "PICKUP",
      options: [
        { key: "PICKUP", label: "Pickup", value: "PICKUP" },
        { key: "DELIVERY", label: "Delivery", value: "DELIVERY" },
      ],
    },

    {
      key: "street",
      label: "Street",
      type: "comparison",
      leftOperand: "deliveryType",
      rightOperand: "DELIVERY",
    },
    {
      key: "city",
      label: "City",
      type: "comparison",
      leftOperand: "deliveryType",
      rightOperand: "DELIVERY",
    },
    {
      key: "state",
      label: "State",
      type: "comparison",
      inputType: "select",
      default: "TX",
      options: [
        { key: "TX", label: "TX", value: "TX" },
        { key: "OK", label: "OK", value: "OK" },
        { key: "AR", label: "AR", value: "AR" },
      ],
      leftOperand: "deliveryType",
      rightOperand: "DELIVERY",
    },
    {
      key: "zipCode",
      label: "Zip Code",
      type: "comparison",
      leftOperand: "deliveryType",
      rightOperand: "DELIVERY",
    },
    { key: "notes", label: "Notes", type: "textarea" },
    {
      key: "taxRate",
      label: "Tax Rate",
      type: "number",
      message: "Enter as decimal · TX: 0.0825 · NM: 0.05125",
    },
  ];

  const orderColumns = [
    { key: "orderNumber", header: "Order #" },
    { key: "fullName", header: "Name" },
    {
      key: "phone",
      header: "Phone",
      render: (value: string) =>
        value ? `${value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}` : "",
    },
    {
      key: "deliveryType",
      header: "Delivery Type",
      render: (value: "DELIVERY" | "PICKUP") => {
        return (
          (value === "PICKUP" ? "📍 " : "🚚 ") +
          value.charAt(0).toUpperCase() +
          value.slice(1).toLowerCase()
        );
      },
    },
    {
      key: "total",
      header: "Total",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: "status",
      header: "Status",
      render: (value: "PENDING" | "DELIVERED" | "CANCELLED", row: Order) => (
        <StatusDropdown
          type="order"
          current={value}
          resourceId={row.orderNumber}
        />
      ),
    },
    {
      key: "actions",
      header: "See",
      render: (value: string) => (
        <Link
          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-green-700 hover:bg-green-300 hover:text-green-800 transition-colors"
          href={value}
        >
          <MdArrowRightAlt size={20} />
        </Link>
      ),
    },
  ] satisfies Column<Order>[];

  async function fetchOrders() {
    try {
      setLoading(true);
      setError(null);

      const res = await apiRequest("/api/orders");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: OrdersResponse = await res.json();

      setOrders(data);
    } catch (error) {
      setError(error.message);
      console.error("Quote fetching error: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
    if (submitStatus === "success") {
      setCustomer({});
      setSearchCustomer(false);
      setResetSearchCustomer((prev) => prev + 1);

      const timeout = setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [submitStatus]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center gap-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible px-2 py-4">
        {loading && <TableSkeleton />}

        {error && <p className="text-red-500">{error}</p>}
        {!loading && orders && (
          <Table
            title={"Orders"}
            columns={orderColumns}
            data={orders.orders}
            keyField="orderNumber"
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
              <span>＋</span> Create New Order
            </>
          )}
        </button>

        {/* Status messages */}
        {submitStatus === "error" && (
          <div className="w-full flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            <span>✕</span>
            <span>Could not register new order. Please try again.</span>
          </div>
        )}
        {submitStatus === "success" && (
          <div className="w-full flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
            <span>✓</span>
            <span>Order registered successfully!</span>
          </div>
        )}

        {/* Form container */}
        {form && (
          <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-5">
              New Order
            </h2>
            <div className="mt-4">
              <div className="flex justify-center mb-4">
                <button
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-sm transition-all duration-150 cursor-pointer"
                  onClick={() => setSearchCustomer(!searchCustomer)}
                >
                  {searchCustomer ? (
                    <>
                      <span>✕</span> Close Search
                    </>
                  ) : (
                    <>
                      <span>＋</span> Existing User
                    </>
                  )}
                </button>
              </div>

              <SearchCustomer
                searchCustomer={searchCustomer}
                customer={customer}
                setCustomer={setCustomer}
                resetSignal={resetSearchCustomer}
              />
              <Form
                inputs={FormData}
                submitType={isSubmitting ? "Creating Order..." : "Create Order"}
                path="orders"
                setIsSubmitting={setIsSubmitting}
                setSubmitStatus={setSubmitStatus}
                products={true}
                options={customer}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
