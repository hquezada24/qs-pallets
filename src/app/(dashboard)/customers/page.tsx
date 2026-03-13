"use client";
import Form from "@/components/Form";
import Table from "@/components/Table";
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
      render: (value: string) =>
        `${value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}`,
    },
  ];

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
    <div className="p-8 flex flex-col sm:flex-row justify-evenly space-y-4">
      <div className="users-left">
        {loading && <p>Loading customers...</p>}

        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <Table
            title={"Customers"}
            columns={orderColumns}
            data={customers.customers}
          />
        )}
      </div>
      <div className="users-"></div>
    </div>
  );
};

export default Customers;
