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
  // const [orders, setOrders] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [isSubmitting, setIsSubmitting] = useState(false);
  //const [submitStatus, setSubmitStatus] = useState(null);

  const orderColumns = [
    { key: "id", header: "Order #" },
    { key: "customer", header: "Client" },
    { key: "address", header: "Address" },
    { key: "product", header: "Product" },
    { key: "quantity", header: "Quantity" },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "Pagado"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const orders = {
    orders: [
      {
        id: "1234",
        customer: "John Smith",
        address: "123 Street City, ST 12345",
        product: "Standard",
        quantity: 500,
        status: "In Progress",
      },
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

      const data: OrdersResponse = await res.json();

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
    <div className="p-8 flex flex-col sm:flex-row justify-evenly space-y-4">
      <div className="users-left">
        {/* {loading && <p>Loading orders...</p>}

        {error && <p className="text-red-500">{error}</p>} */}
        {/* {!loading && !error && (
        )} */}
        <Table title={"Orders"} columns={orderColumns} data={orders.orders} />
      </div>
      <div className="users-"></div>
    </div>
  );
};

export default Orders;
