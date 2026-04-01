"use client";

import { useState } from "react";
import { Product } from "@/types/product";

interface StockModalProps {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
}

// ── Shared input style ─────────────────────────────────────────────────────────
const inputClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 transition placeholder-gray-300";

// ── Component ──────────────────────────────────────────────────────────────────
export default function StockModal({
  product,
  onClose,
  onSuccess,
}: StockModalProps) {
  const [form, setForm] = useState({
    quantity: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const quantityNum = Number(form.quantity);
  const isValid = form.quantity !== "" && quantityNum > 0;

  async function handleConfirm() {
    if (!isValid) return;
    setLoading(true);
    try {
      await fetch(`/api/our-products/${product._id}/stock`, {
        method: "PATCH",
        body: JSON.stringify({ quantity: quantityNum, notes: form.notes }),
      });
      onSuccess();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="text-xl">📦</span>
            <div>
              <h3 className="text-sm font-semibold text-blue-800">Add Stock</h3>
              <p className="text-xs text-blue-500 mt-0.5">
                Update inventory for this product
              </p>
            </div>
          </div>
        </div>

        {/* Read-only context */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Product</span>
            <span className="text-sm font-medium text-gray-800">
              {product.name}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Current stock</span>
            <span className="text-sm font-medium text-gray-800">
              {product.stockTotal.toLocaleString()} units
            </span>
          </div>
          {isValid && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">After update</span>
              <span className="text-sm font-semibold text-green-700">
                {(product.stockTotal + quantityNum).toLocaleString()} units
              </span>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Quantity */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">
              Quantity to add <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min={1}
              placeholder="e.g. 200"
              value={form.quantity}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, quantity: e.target.value }))
              }
              className={inputClass}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Notes</label>
            <textarea
              rows={3}
              placeholder="Supplier, reason, PO number..."
              value={form.notes}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            disabled={!isValid || loading}
            onClick={handleConfirm}
            className="px-5 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {loading ? "Saving..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
