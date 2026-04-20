"use client";
import Table, { Column } from "@/components/Table";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";

type Order = {
  id: string;
  date: string;
  customer: string;
  address: string;
  product: string;
  price: number;
  quantity: number;
  status: string;
};

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orderColumns = [
    { key: "id", header: "Order #" },
    { key: "date", header: "Date" },
    { key: "customer", header: "Client" },
    { key: "product", header: "Product" },
    { key: "quantity", header: "Quantity" },
    {
      key: "price",
      header: "Earning",
      render: (_value: number, row: Order) => {
        return `$${row.quantity * row.price}`;
      },
    },
  ] satisfies Column<Order>[];

  const orders: { orders: Order[] } = {
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
      const message =
        error instanceof Error ? error.message : "Failed to fetch data";

      setError(message);
      console.error("Quote fetching error: ", message);
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
          keyField={"id"}
        />
      </div>
      <div className="users-"></div>
    </div>
  );
};

export default Analytics;
