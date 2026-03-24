"use client";
import Table from "@/components/Table";
import { MdArrowRightAlt } from "react-icons/md";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { Quote } from "@/types/quote";
import Link from "next/link";

type QuotesResponse = {
  quotes: Quote[];
};

const Quotes = () => {
  const [quotes, setQuotes] = useState<QuotesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderColumns = [
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
    { key: "status", header: "Status" },
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
    <div className="p-8 flex flex-col sm:flex-row justify-evenly space-y-4">
      <div className="users-left">
        {loading && <p>Loading quotes...</p>}

        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <Table
            title={"Quotes"}
            columns={orderColumns}
            data={quotes.quotes}
            hover={"No"}
          />
        )}
      </div>
      <div className="users-"></div>
    </div>
  );
};

export default Quotes;
