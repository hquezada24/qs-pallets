"use client";
import Form from "@/components/Form";
import Table from "@/components/Table";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { Quote } from "@/types/quote";

type QuotesResponse = {
  quotes: Quote[];
};

const Quotes = () => {
  const [quotes, setQuotes] = useState<QuotesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [isSubmitting, setIsSubmitting] = useState(false);
  //const [submitStatus, setSubmitStatus] = useState(null);

  const orderColumns = [
    { key: "_id", header: "Order #" },
    { key: "fullName", header: "Client" },
    { key: "email", header: "Email" },
    {
      key: "phone",
      header: "Phone",
      render: (value: string) =>
        `${value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}`,
    },
    { key: "palletType", header: "Pallet" },
    { key: "quantity", header: "Quantity" },
    { key: "city", header: "City" },
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

  console.log(quotes);

  return (
    <div className="p-8 flex flex-col sm:flex-row justify-evenly space-y-4">
      <div className="users-left">
        {loading && <p>Loading quotes...</p>}

        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <Table title={"Quotes"} columns={orderColumns} data={quotes.quotes} />
        )}
      </div>
      <div className="users-"></div>
    </div>
  );
};

export default Quotes;
