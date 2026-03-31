"use client";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import Table from "@/components/Table";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { Order } from "@/types/order";
import TableSkeleton from "@/components/TableSkeleton";
import StatusDropdown from "@/components/StatusDropdown";

type OrdersResponse = {
  orders: Order[];
};

const Orders = () => {
  const [orders, setOrders] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      render: (value: "PENDING" | "DELIVERED" | "CANCELLED") => (
        <StatusDropdown type="order" current={value} />
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
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible px-2 py-4">
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
