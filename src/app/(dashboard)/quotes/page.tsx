"use client";
import Table from "@/components/Table";
import { MdArrowRightAlt } from "react-icons/md";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { Quote } from "@/types/quote";
import Link from "next/link";
import TableSkeleton from "@/components/TableSkeleton";

type QuotesResponse = {
  quotes: Quote[];
};

const Quotes = () => {
  const [quotes, setQuotes] = useState<QuotesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderColumns = [
    { key: "quoteNumber", header: "Quote #" },
    {
      key: "createdAt",
      header: "Date Created",
      render: (value: string) =>
        new Date(value).toLocaleDateString("en-US", { timeZone: "UTC" }),
    },
    { key: "fullName", header: "Client" },
    { key: "companyName", header: "Company" },
    { key: "email", header: "Email" },
    {
      key: "phone",
      header: "Phone",
      render: (value: string) =>
        `${value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}`,
    },
    { key: "city", header: "City" },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "NEW"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : value === "PENDING"
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : value === "APPROVED"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50   text-red-600   border border-red-200"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
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

  async function fetchQuotes() {
    try {
      setLoading(true);
      setError(null);

      const res = await apiRequest("/api/quotes");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: QuotesResponse = await res.json();

      setQuotes(data);
    } catch (error) {
      setError(error.message);
      console.error("Quote fetching error: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center gap-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden px-2 py-4">
        {loading && <TableSkeleton />}

        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <Table
            title={"Quotes"}
            columns={orderColumns}
            data={quotes.quotes}
            hover={"No"}
            keyField="createdAt"
          />
        )}
      </div>
    </div>
  );
};

export default Quotes;
