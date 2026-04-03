"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import QuoteSkeleton from "@/components/QuoteSkeleton";
import StatusDropdown from "@/components/StatusDropdown";
import { apiRequest } from "@/lib/apiRequest";
import { useParams } from "next/navigation";
import Table from "@/components/Table";
import { IOrder } from "@/types/order";

type OrderResponse = {
  order: IOrder;
};

const columns = [
  {
    key: "name",
    header: "Product",
  },
  {
    key: "quantity",
    header: "Qty",
  },
  {
    key: "price",
    header: "Unit Price",
    render: (value: number) => (value !== 0 ? `$${value.toFixed(2)}` : "—"),
  },
  {
    key: "total",
    header: "Total",
    render: (_: any, row: any) =>
      row.price != 0 ? `$${(row.price * row.quantity).toFixed(2)}` : "—",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso: Date) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const formatPhone = (p: string) =>
  p.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
    {children}
  </h2>
);

const Field = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => {
  if (!value && value !== 0) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
  );
};

const Divider = () => <hr className="border-gray-100 my-6" />;

// ─── Main Component ───────────────────────────────────────────────────────────

const Order = () => {
  const [order, setOrder] = useState<OrderResponse | null>(null);
  // const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [pendingStatus, setPendingStatus] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        setError(null);

        const res = await apiRequest(`/api/orders/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }

        const data: OrderResponse = await res.json();

        setOrder(data);
        // setProducts(data.order.items);
      } catch (error) {
        setError(error.message);
        console.error("Order fetching error: ", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  if (loading) return <QuoteSkeleton />;

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center gap-4">
        {/* ── Back button ──────────────────────────────────────────────────── */}
        <div className="w-full max-w-3xl">
          <Link
            href={"/orders"}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M10 12L6 8l4-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All Orders
          </Link>
        </div>

        {/* ── Error banner ──────────────────────────────────────────────────── */}
        {error && (
          <div className="w-full max-w-3xl flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {order && (
          <>
            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Order #{order.order.orderNumber}
                  </p>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {order.order.customer.name}
                  </h1>
                  {order.order.customer.companyName && (
                    <p className="text-sm text-gray-500 mt-0.5">
                      {order.order.customer.companyName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <StatusDropdown type="order" current={order.order.status} />
                  <span className="text-xs text-gray-400">
                    {formatDate(order.order.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Contact & Address ─────────────────────────────────────────── */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
              <SectionTitle>Contact</SectionTitle>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-2">
                <Field label="Email" value={order.order.customer.email} />
                <Field
                  label="Phone"
                  value={formatPhone(order.order.customer.phone)}
                />
              </div>

              <Divider />
            </div>

            {/* ── Product ───────────────────────────────────────────────────── */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
              <SectionTitle>Products</SectionTitle>

              <Table
                title={""}
                columns={columns}
                data={order.order.items}
                keyField={"id"}
              />

              {order.order.quote.customDimensions && (
                <>
                  <Divider />
                  <SectionTitle>Custom Dimensions</SectionTitle>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {(
                      [
                        [
                          "Length",
                          order.order.quote.customDimensions.length,
                          "in",
                        ],
                        [
                          "Width",
                          order.order.quote.customDimensions.width,
                          "in",
                        ],
                        [
                          "Height",
                          order.order.quote.customDimensions.height,
                          "in",
                        ],
                        [
                          "Weight Cap.",
                          order.order.quote.customDimensions.weightCapacity,
                          "lbs",
                        ],
                      ] as const
                    ).map(([label, val, unit]) => (
                      <div
                        key={label}
                        className="flex flex-col gap-0.5 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3"
                      >
                        <span className="text-xs text-gray-400">{label}</span>
                        <span className="text-sm font-semibold text-gray-800">
                          {val ?? "—"}{" "}
                          {val != null && (
                            <span className="text-xs font-normal text-gray-400">
                              {unit}
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  {order.order.quote.customDimensions.notes && (
                    <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                      <p className="text-xs text-gray-400 mb-1">
                        Dimension Notes
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {order.order.quote.customDimensions.notes}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Additional Details ────────────────────────────────────────── */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
              <SectionTitle>Additional Details</SectionTitle>
              {order.order.notes && (
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {order.order.notes}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Order;
