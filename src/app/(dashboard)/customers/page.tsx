"use client";
import Table, { Column } from "@/components/Table";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { Customer } from "@/types/customer";

type CustomersResponse = {
  customers: Customer[];
};

const Customers = () => {
  const [customers, setCustomers] = useState<CustomersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [isSubmitting, setIsSubmitting] = useState(false);
  //const [submitStatus, setSubmitStatus] = useState(null);

  const orderColumns = [
    { key: "fullName", header: "Client" },
    { key: "companyName", header: "Company" },
    { key: "email", header: "Email" },
    {
      key: "phone",
      header: "Phone",
      render: (_value: string) =>
        `${_value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}`,
    },
  ] satisfies Column<Customer>[];

  async function fetchCustomers() {
    try {
      setLoading(true);
      setError(null);

      const res = await apiRequest("/api/customers");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: CustomersResponse = await res.json();

      setCustomers(data);
    } catch (error) {
      setError(error.message);
      console.error("Quote fetching error: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  console.log(customers);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center gap-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden px-2 py-4">
        {loading && <p>Loading customers...</p>}

        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <Table
            title={"Customers"}
            columns={orderColumns}
            data={customers.customers}
            keyField={"_id"}
          />
        )}
      </div>
      <div className="users-"></div>
    </div>
  );
};

export default Customers;
