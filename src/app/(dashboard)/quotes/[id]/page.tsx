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
  deliveryType: "DELIVERY" | "PICKUP";
  address: string;
  city: string;
  state: string;
  zip: string;
  taxExempt: boolean;
  taxRate: string;
  tax: string;
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
    deliveryType: "DELIVERY", // 👈
    address: "", // 👈
    city: "", // 👈
    state: "", // 👈
    zip: "", // 👈
    taxExempt: true, // 👈 true por default ya que la mayoría son exentos
    taxRate: "", // 👈
    tax: "",
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
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

        {/* Items */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col justify-between text-sm space-y-2">
            {quote.items.map((item) => (
              <div
                key={item.id.toString()}
                className="flex justify-between items-center"
              >
                <div className="flex justify-start w-[50%]">
                  <span className="text-gray-500">{item.name}</span>
                </div>
                <div className="flex justify-start w-[50%]">
                  <span className="font-medium text-gray-800 pl-1.5">
                    {item.price !== 0 &&
                      `${item.quantity.toLocaleString()} units ·`}
                    {item.price != null && (
                      <span className="text-gray-400 font-normal ml-1">
                        {" "}
                        {item.price === 0 ? (
                          <input
                            placeholder="$ per unit"
                            type="number"
                            min={0}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 transition placeholder-gray-300"
                          />
                        ) : (
                          `$${(item.price * item.quantity).toFixed(2)}`
                        )}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Delivery Date */}
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

          {/* Delivery / Pickup Toggle */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">
              Fulfillment Type
            </label>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm ${form.deliveryType === "PICKUP" ? "text-gray-400" : "font-medium text-gray-700"}`}
              >
                Delivery
              </span>
              <button
                type="button"
                onClick={() =>
                  set("deliveryType")({
                    target: {
                      value:
                        form.deliveryType === "DELIVERY"
                          ? "PICKUP"
                          : "DELIVERY",
                    },
                  } as any)
                }
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  form.deliveryType === "PICKUP" ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    form.deliveryType === "PICKUP"
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </button>
              <span
                className={`text-sm ${form.deliveryType === "PICKUP" ? "font-medium text-gray-700" : "text-gray-400"}`}
              >
                Pickup
              </span>
            </div>

            {/* Address fields — only when DELIVERY */}
            {form.deliveryType === "DELIVERY" && (
              <div className="mt-3 flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Street address"
                  value={form.address}
                  onChange={set("address")}
                  className={inputClass}
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={set("city")}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    maxLength={2}
                    value={form.state}
                    onChange={set("state")}
                    className={`${inputClass} uppercase`}
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    maxLength={5}
                    value={form.zip}
                    onChange={set("zip")}
                    className={inputClass}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tax Toggle */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Tax</label>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm ${form.taxExempt ? "text-gray-400" : "font-medium text-gray-700"}`}
              >
                Taxable
              </span>
              <button
                type="button"
                onClick={() =>
                  set("taxExempt")({
                    target: { value: !form.taxExempt },
                  } as any)
                }
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  form.taxExempt ? "bg-green-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    form.taxExempt ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                className={`text-sm ${form.taxExempt ? "font-medium text-gray-700" : "text-gray-400"}`}
              >
                Tax Exempt
              </span>
            </div>

            {/* Tax Rate input — only when taxable */}
            {!form.taxExempt && (
              <div className="mt-3">
                <label className="text-xs text-gray-400 mb-1.5 block">
                  Tax Rate <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.0001"
                    min="0"
                    max="1"
                    placeholder="0.0825"
                    value={form.taxRate}
                    onChange={set("taxRate")}
                    className={`${inputClass} pr-8`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    %
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Enter as decimal · TX: 0.0825 · NM: 0.05125
                </p>
              </div>
            )}
          </div>

          {/* Internal Notes */}
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

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            disabled={
              !form.deliveryDate ||
              (!form.taxExempt && !form.taxRate) ||
              (form.deliveryType === "DELIVERY" &&
                (!form.address || !form.city || !form.state || !form.zip))
            }
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

  const handleApproveConfirm = (details: OrderDetails) => {
    setPendingStatus(null);
  };

  if (loading) return <QuoteSkeleton />;

  return (
    <>
      {pendingStatus && quote && (
        <ApproveModal
          quote={quote.quote}
          onConfirm={handleApproveConfirm}
          onCancel={() => setPendingStatus(false)}
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

              {/* <SectionTitle>Address</SectionTitle>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <Field label="Street" value={quote.quote.address.street} />
                <Field label="City" value={quote.quote.address.city} />
                <Field label="State" value={quote.quote.address.state} />
                <Field label="ZIP Code" value={quote.quote.address.zipCode} />
              </div> */}
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
