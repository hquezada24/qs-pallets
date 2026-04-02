"use client";
import { IQuote } from "@/types/quote";
import { useState, useEffect, useRef } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { useParams } from "next/navigation";
import { IOrder } from "@/types/order";

interface QuoteData extends IQuote {
  _id: string;
}

type StatusResponse = {
  status?: {
    _id: string;
    status: "PENDING" | "APPROVED" | "SOLVED" | "DELIVERED" | "CANCELLED";
  };
  updated?: {
    _id: string;
    status: "PENDING" | "APPROVED" | "SOLVED" | "DELIVERED" | "CANCELLED";
  };
};

const STATUSES = ["PENDING", "APPROVED", "SOLVED"] as const;
const ORDER_STATUSES = ["PENDING", "DELIVERED", "CANCELLED"] as const;

const STATUS_CONFIG: Record<
  QuoteData["status"],
  { label: string; pill: string; option: string }
> = {
  PENDING: {
    label: "Pending",
    pill: "bg-amber-50 text-amber-700 border border-amber-200",
    option: "text-amber-700",
  },
  APPROVED: {
    label: "Approved",
    pill: "bg-green-50 text-green-700 border border-green-200",
    option: "text-green-700",
  },
  SOLVED: {
    label: "Solved",
    pill: "bg-gray-50   text-gray-600   border border-gray-200",
    option: "text-gray-600",
  },
};

const ORDER_STATUS: Record<
  IOrder["status"],
  { label: string; pill: string; option: string }
> = {
  PENDING: {
    label: "Pending",
    pill: "bg-amber-50 text-amber-700 border border-amber-200",
    option: "text-amber-700",
  },
  DELIVERED: {
    label: "Delivered",
    pill: "bg-green-50 text-green-700 border border-green-200",
    option: "text-green-700",
  },
  CANCELLED: {
    label: "Cancelled",
    pill: "bg-red-50 text-red-700 border border-red-200",
    option: "text-red-700",
  },
};

const StatusDropdown = ({
  type,
  current,
  setPendingStatus,
  resourceId,
}: {
  type: "quote" | "order";
  current: QuoteData["status"] | IOrder["status"];
  setPendingStatus?: React.Dispatch<React.SetStateAction<boolean>>;
  resourceId?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<QuoteData["status"] | IOrder["status"]>(
    current,
  );
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const params = useParams();

  useEffect(() => {
    setStatus(current);
    setError(null);
  }, [current]);

  const id =
    resourceId ||
    (typeof params.id === "string" ? params.id : (params.id?.[0] ?? ""));

  const handleStatusChange = async (
    newStatus: QuoteData["status"] | IOrder["status"],
    id: string,
  ) => {
    setLoading(true);
    setError(null);
    try {
      if (!id) {
        throw new Error("Missing resource id");
      }

      const res = await apiRequest(
        `/api/${type === "quote" ? "quotes" : "orders"}/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to update status: ${res.status}`);
      }

      const data: StatusResponse = await res.json();
      const nextStatus = data.status?.status ?? data.updated?.status;

      if (!nextStatus) {
        throw new Error("Missing status in response");
      }

      setStatus(nextStatus);

      if (nextStatus === "APPROVED") {
        setPendingStatus(true);
      }
    } catch {
      setError("Failed to update status.");
      console.error("Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Loading pill */}
      {loading && (
        <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-400 border border-gray-200">
          <svg
            className="w-3 h-3 animate-spin"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 1v2M6 9v2M1 6h2M9 6h2" strokeLinecap="round" />
          </svg>
          Updating...
        </span>
      )}

      {/* Error pill */}
      {error && !loading && (
        <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-red-50 text-red-500 border border-red-200 cursor-default">
          <span>⚠</span>
          Failed to update
        </span>
      )}

      {/* Status button — solo visible si no loading ni error */}
      {!loading && !error && (
        <button
          onClick={() => setOpen((o) => !o)}
          className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full transition hover:opacity-80 ${type === "quote" ? STATUS_CONFIG[status].pill : ORDER_STATUS[status].pill}`}
        >
          {type === "quote" && STATUS_CONFIG[status].label}
          {type === "order" && ORDER_STATUS[status].label}
          <svg
            className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M2 4l4 4 4-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {open && !loading && !error && (
        <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden z-10">
          {type === "quote" &&
            STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => {
                  handleStatusChange(s, id);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-gray-50 transition flex items-center justify-between ${STATUS_CONFIG[s].option}`}
              >
                {STATUS_CONFIG[s].label}
                {s === status && (
                  <svg
                    className="w-3 h-3 opacity-60"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            ))}
          {type === "order" &&
            ORDER_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => {
                  handleStatusChange(s, id);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-gray-50 transition flex items-center justify-between ${ORDER_STATUS[s].option}`}
              >
                {ORDER_STATUS[s].label}
                {s === status && (
                  <svg
                    className="w-3 h-3 opacity-60"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
