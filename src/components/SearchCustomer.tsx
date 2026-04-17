"use client";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { apiRequest } from "@/lib/apiRequest";
import { Customer } from "@/types/customer";
import { IoMdCheckmark } from "react-icons/io";

type CustomersResponse = {
  customers: Customer[];
};

const SearchCustomer = ({ searchCustomer, customer, setCustomer }) => {
  const [customers, setCustomers] = useState<CustomersResponse>();
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [field, setField] = useState<string>("fullName");
  const debouncedQuery = useDebounce(query, 350);

  useEffect(() => {
    const fetchClientes = async ({ field, q }) => {
      try {
        setError(null);
        const params = new URLSearchParams({
          field,
          q,
        });

        const res = await apiRequest(`/api/customers?${params}`);

        const data = await res.json();
        setCustomers(data);
        if (data.customers.length === 0) {
          setError("No Customers Found");
        }
      } catch (error) {
        console.error("fetchClientes: ", error);
      }
    };
    if (debouncedQuery.length < 1) return;
    fetchClientes({ field, q: debouncedQuery });
  }, [debouncedQuery, field]);

  return (
    <>
      {searchCustomer && (
        <>
          <form>
            <div className="flex flex-col items-center space-y-3">
              <div className="space-y-0.5 flex flex-col items-center">
                <label htmlFor="filter" className="mr-2">
                  Search By
                </label>
                <select
                  name="filter"
                  id="filter"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="w-full px-2 py-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition mr-2"
                >
                  <option value="fullName">Name</option>
                  <option value="companyName">Company Name</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="city">City</option>
                </select>
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search by ${field}...`}
                  className="px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition mr-2"
                />
              </div>
            </div>
          </form>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {error && <p className="text-red-500">{error}</p>}
              {customers &&
                customers.customers.map((item) => {
                  const isEmpty = Object.keys(customer).length === 0;
                  return (
                    <div
                      key={item._id}
                      className="flex items-center justify-between gap-4 bg-white border-2 border-[#e2e8f0] rounded-lg px-4 py-3 hover:border-[#32cd32] transition-colors duration-200 focus-within:border-[#228b22] focus-within:shadow-[0_0_0_3px_rgba(34,139,34,0.1)]"
                    >
                      {/* Product info */}
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="min-w-0">
                          <p className="text-[#2d3748] font-semibold text-sm leading-tight truncate">
                            {item.fullName}
                          </p>
                          {item.companyName && (
                            <p className="text-[#718096] text-xs mt-0.5">
                              {item.companyName} / unit
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setCustomer((prev) =>
                              prev._id === item._id ? {} : item,
                            );
                          }}
                          disabled={!isEmpty && customer._id !== item._id}
                          className="w-7 h-7 rounded-md border-2 border-[#e2e8f0] text-[#718096] font-bold text-base leading-none flex items-center justify-center hover:border-[#228b22] hover:text-[#228b22] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {customer._id !== item._id ? "+" : <IoMdCheckmark />}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SearchCustomer;
