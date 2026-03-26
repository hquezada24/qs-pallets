"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IQuote } from "@/types/quote";
import QuoteSkeleton from "@/components/QuoteSkeleton";
import StatusDropdown from "@/components/StatusDropdown";
import { apiRequest } from "@/lib/apiRequest";
import { useParams } from "next/navigation";
import Table from "@/components/Table";

interface QuoteData extends IQuote {
  _id: string;
}

type QuoteResponse = {
  quote: QuoteData;
};

interface OrderDetails {
  deliveryDate: string;
  poNumber: string;
  internalNotes: string;
}

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

// ─── Approve Modal ────────────────────────────────────────────────────────────

const ApproveModal = ({
  quote,
  onConfirm,
  onCancel,
}: {
  quote: QuoteData;
  onConfirm: (details: OrderDetails) => void;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState<OrderDetails>({
    deliveryDate: "",
    poNumber: "",
    internalNotes: "",
  });

  const set =
    (key: keyof OrderDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 transition placeholder-gray-300";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-green-50 border-b border-green-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="text-xl">✅</span>
            <div>
              <h3 className="text-sm font-semibold text-green-800">
                Approve & Create Order
              </h3>
              <p className="text-xs text-green-600 mt-0.5">
                Quote #{quote.quoteNumber} · {quote.customer.name}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex justify-between text-sm">
            {/* <span className="text-gray-500">{quote.name}</span>
            <span className="font-medium text-gray-800">
              {quote.quantity.toLocaleString()} units
              {quote.price != null && (
                <span className="text-gray-400 font-normal ml-1">
                  · ${(quote.price * quote.quantity).toFixed(2)}
                </span>
              )}
            </span> */}
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">
              Estimated Delivery Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={form.deliveryDate}
              onChange={set("deliveryDate")}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">
              PO / Reference Number
            </label>
            <input
              type="text"
              placeholder="e.g. PO-2026-084"
              value={form.poNumber}
              onChange={set("poNumber")}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">
              Internal Notes
            </label>
            <textarea
              rows={3}
              placeholder="Production notes, special instructions..."
              value={form.internalNotes}
              onChange={set("internalNotes")}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            disabled={!form.deliveryDate}
            onClick={() => onConfirm(form)}
            className="px-5 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Approve & Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Quote = () => {
  // const [quote, setQuote] = useState<QuoteData | null>(null);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingStatus, setPendingStatus] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchQuote() {
      try {
        setLoading(true);
        setError(null);

        const res = await apiRequest(`/api/quotes/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch quote");
        }

        const data: QuoteResponse = await res.json();

        setQuote(data);
        setProducts(data.quote.items);
      } catch (error) {
        setError(error.message);
        console.error("Quote fetching error: ", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, [id]);

  const handleStatusChange = (newStatus: QuoteData["status"]) => {
    // if (newStatus === "APPROVED") {
    //   setPendingStatus("APPROVED");
    // } else {
    //   applyStatus(newStatus);
    // }
    if (!quote) return;
    try {
      // await fetch(`/api/quotes/${quote.id}/status`, {
      //   method: "PATCH",
      //   body: JSON.stringify({ status: newStatus, orderDetails }),
      // });
    } catch {
      setError("Failed to update status.");
    }
  };

  const applyStatus = async (
    newStatus: QuoteData["status"],
    orderDetails?: OrderDetails,
  ) => {
    if (!quote) return;
    try {
      // await fetch(`/api/quotes/${quote.id}/status`, {
      //   method: "PATCH",
      //   body: JSON.stringify({ status: newStatus, orderDetails }),
      // });
      setQuote((prev) => (prev ? { ...prev, status: newStatus } : prev));
      if (orderDetails) {
        // await fetch("/api/orders", {
        //   method: "POST",
        //   body: JSON.stringify({ quoteId: quote.id, ...orderDetails }),
        // });
        console.log("Order created:", {
          quoteId: quote.quote._id,
          ...orderDetails,
        });
      }
    } catch {
      setError("Failed to update status.");
    }
  };

  const handleApproveConfirm = (details: OrderDetails) => {
    applyStatus("APPROVED", details);
    setPendingStatus(null);
  };

  if (loading) return <QuoteSkeleton />;

  return (
    <>
      {pendingStatus && quote && (
        <ApproveModal
          quote={quote.quote}
          onConfirm={handleApproveConfirm}
          onCancel={() => setPendingStatus(null)}
        />
      )}

      <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center gap-4">
        {/* ── Back button ──────────────────────────────────────────────────── */}
        <div className="w-full max-w-3xl">
          <Link
            href={"/quotes"}
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
            All Quotes
          </Link>
        </div>

        {/* ── Error banner ──────────────────────────────────────────────────── */}
        {error && (
          <div className="w-full max-w-3xl flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {quote && (
          <>
            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Quote #{quote.quote.quoteNumber}
                  </p>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {quote.quote.customer.name}
                  </h1>
                  {quote.quote.customer.companyName && (
                    <p className="text-sm text-gray-500 mt-0.5">
                      {quote.quote.customer.companyName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <StatusDropdown
                    current={quote.quote.status}
                    setPendingStatus={setPendingStatus}
                  />
                  <span className="text-xs text-gray-400">
                    {formatDate(quote.quote.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Contact & Address ─────────────────────────────────────────── */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
              <SectionTitle>Contact</SectionTitle>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-2">
                <Field label="Email" value={quote.quote.customer.email} />
                <Field
                  label="Phone"
                  value={formatPhone(quote.quote.customer.phone)}
                />
              </div>

              <Divider />

              <SectionTitle>Address</SectionTitle>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <Field label="Street" value={quote.quote.address.street} />
                <Field label="City" value={quote.quote.address.city} />
                <Field label="State" value={quote.quote.address.state} />
                <Field label="ZIP Code" value={quote.quote.address.zipCode} />
              </div>
            </div>

            {/* ── Product ───────────────────────────────────────────────────── */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
              <SectionTitle>Products</SectionTitle>

              <Table
                title={""}
                columns={columns}
                data={quote.quote.items}
                keyField={"id"}
              />

              {quote.quote.customDimensions && (
                <>
                  <Divider />
                  <SectionTitle>Custom Dimensions</SectionTitle>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {(
                      [
                        ["Length", quote.quote.customDimensions.length, "in"],
                        ["Width", quote.quote.customDimensions.width, "in"],
                        ["Height", quote.quote.customDimensions.height, "in"],
                        [
                          "Weight Cap.",
                          quote.quote.customDimensions.weightCapacity,
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

                  {quote.quote.customDimensions.notes && (
                    <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                      <p className="text-xs text-gray-400 mb-1">
                        Dimension Notes
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {quote.quote.customDimensions.notes}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Additional Details ────────────────────────────────────────── */}
            {quote.quote.additionalDetails && (
              <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
                <SectionTitle>Additional Details</SectionTitle>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {quote.quote.additionalDetails}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Quote;
