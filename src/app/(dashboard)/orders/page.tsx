"use client";
import Form from "@/components/Form";
import Table from "@/components/Table";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { Order } from "@/types/order";

type OrdersResponse = {
  orders: Order[];
};

const Orders = () => {
  const [orders, setOrders] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [isSubmitting, setIsSubmitting] = useState(false);
  //const [submitStatus, setSubmitStatus] = useState(null);

  console.log(orders);

  const orderColumns = [
    { key: "orderNumber", header: "Order #" },
    { key: "customerName", header: "Name" },
    { key: "phone", header: "Phone" },
    { key: "deliveryType", header: "Delivery Type" },
    {
      key: "total",
      header: "Total",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "PENDING"
              ? "bg-amber-50 text-amber-700 border border-amber-200"
              : value === "IN_PRODUCTION"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : value === "READY"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : value === "CANCELED"
                    ? "bg-red-50   text-red-600   border border-red-200"
                    : "bg-gray-50   text-gray-600   border border-gray-200"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  // const orders = {
  //   orders: [
  //     {
  //       id: "1234",
  //       customer: "John Smith",
  //       address: "123 Street City, ST 12345",
  //       product: "Standard",
  //       quantity: 500,
  //       status: "In Progress",
  //     },
  //   ],
  // };

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
  }, []);

  console.log(orders);

  return (
    <div className="p-8 flex flex-col sm:flex-row justify-evenly space-y-4">
      <div className="users-left">
        {/* {loading && <p>Loading orders...</p>}

        {error && <p className="text-red-500">{error}</p>} */}
        {/* {!loading && !error && (
        )} */}
        {!loading && orders && (
          <Table
            title={"Orders"}
            columns={orderColumns}
            data={orders.orders}
            keyField="id"
          />
        )}
      </div>
      <div className="users-"></div>
    </div>
  );
};

export default Orders;
