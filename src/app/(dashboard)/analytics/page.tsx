"use client";
import Form from "@/components/Form";
import Table from "@/components/Table";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { Number } from "mongoose";
// import { Order } from "@/types/order";

// type OrdersResponse = {
//   orders: Order[];
// };

const Analytics = () => {
  // const [orders, setOrders] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [isSubmitting, setIsSubmitting] = useState(false);
  //const [submitStatus, setSubmitStatus] = useState(null);

  const orderColumns = [
    { key: "id", header: "Order #" },
    { key: "date", header: "Date" },
    { key: "customer", header: "Client" },
    { key: "product", header: "Product" },
    { key: "quantity", header: "Quantity" },
    {
      key: "earning",
      header: "Earning",
      render: (value: null, row: object) => {
        return `$${row["quantity"] * row["price"]}`;
      },
    },
  ];

  const orders = {
    orders: [
      {
        id: "1234",
        date: "1/3/2026",
        customer: "John Smith",
        address: "123 Street City, ST 12345",
        product: "Standard",
        price: 11,
        quantity: 500,
        status: "In Progress",
      },
      {
        id: "4321",
        date: "7/3/2026",
        customer: "Juan Lopez",
        address: "123 Street City, ST 12345",
        product: "Standard",
        price: 11,
        quantity: 1000,
        status: "In Progress",
      },
      {
        id: "5678",
        date: "15/3/2026",
        customer: "Turf Farm",
        address: "123 Street City, ST 12345",
        product: "Standard",
        price: 11,
        quantity: 250,
        status: "In Progress",
      },
      {
        id: "1111",
        date: "23/3/2026",
        customer: "John Smith",
        address: "123 Street City, ST 12345",
        product: "Standard",
        price: 11,
        quantity: 300,
        status: "In Progress",
      },
      { quantity: "Total: ", status: "$" },
    ],
  };

  async function fetchOrders() {
    try {
      setLoading(true);
      setError(null);

      const res = await apiRequest("/api/orders");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      // const data: OrdersResponse = await res.json();

      //setOrders(data);
    } catch (error) {
      setError(error.message);
      console.error("Quote fetching error: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center gap-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden px-2 py-4">
        {/* {loading && <p>Loading orders...</p>}

        {error && <p className="text-red-500">{error}</p>} */}
        {/* {!loading && !error && (
        )} */}
        <Table
          title={"Sales this month"}
          columns={orderColumns}
          data={orders.orders}
          keyField="id"
        />
      </div>
      <div className="users-"></div>
    </div>
  );
};

export default Analytics;
