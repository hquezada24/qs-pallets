"use client";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import Table from "@/components/Table";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { Order } from "@/types/order";
import TableSkeleton from "@/components/TableSkeleton";

type OrdersResponse = {
  orders: Order[];
};

const Orders = () => {
  const [orders, setOrders] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  ];

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
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center gap-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden px-2 py-4">
        {loading && <TableSkeleton />}

        {error && <p className="text-red-500">{error}</p>}
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
