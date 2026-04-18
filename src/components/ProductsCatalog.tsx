"use client";
import ProductsSkeleton from "./ProductsSkeleton";
import { useState } from "react";
import { useApiQuery } from "@/hooks/useApiQuery";

type QuoteItem = {
  id: string;
  name: string;
  price?: number;
  quantity: number;
  isCustom: boolean;
};

type Product = {
  _id: string;
  name: string;
  icon: string;
  price?: number;
  isCustom: boolean;
};

type Products = {
  icon: string;
  isCustom: boolean;
  isMadeToOrder: boolean;
  name: string;
  price: number;
  stockReserved: number;
  stockTotal: number;
  _id: string;
};

type ProductsFetch = {
  products: Products[];
};

const ProductsCatalog = ({
  items,
  onItemsChange,
  customDimensions,
  onCustomDimensionsChange,
  showCustomSection,
}) => {
  const {
    data: products,
    loading,
    error,
  }: {
    data: ProductsFetch;
    loading: boolean;
    error: string | null;
  } = useApiQuery("/api/our-products");

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    onCustomDimensionsChange((prev) => ({ ...prev, [name]: value }));
  };

  // Handler para actualizar cantidad por productId
  const handleQuantityChange = (product: Product, value: number) => {
    const clamped = Math.max(0, value);

    onItemsChange((prev) => {
      const exists = prev.find((i) => i.id === product._id);

      // Si quantity llega a 0, lo removemos del array
      if (clamped === 0) {
        return prev.filter((i) => i.id !== product._id);
      }

      // Si ya existe, solo actualizamos quantity
      if (exists) {
        return prev.map((i) =>
          i.id === product._id ? { ...i, quantity: clamped } : i,
        );
      }

      // Si no existe, lo agregamos con todos sus datos
      return [
        ...prev,
        {
          id: product._id,
          name: product.name,
          ...(product.price !== null && { price: product.price }),
          quantity: clamped,
          isCustom: product.isCustom,
        },
      ];
    });
  };

  return (
    <>
      {loading ? (
        <ProductsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {products.products.map((item) => {
            const currentQty =
              items.find((i) => i.id === item._id)?.quantity || 0;
            return (
              <div
                key={item._id}
                className="flex items-center justify-between gap-4 bg-white border-2 border-[#e2e8f0] rounded-lg px-4 py-3 hover:border-[#32cd32] transition-colors duration-200 focus-within:border-[#228b22] focus-within:shadow-[0_0_0_3px_rgba(34,139,34,0.1)]"
              >
                {/* Product info */}
                <div className="flex items-center gap-2 min-w-0">
                  {item.icon && (
                    <span className="text-xl shrink-0">{item.icon}</span>
                  )}
                  <div className="min-w-0">
                    <p className="text-[#2d3748] font-semibold text-sm leading-tight truncate">
                      {item.name}
                    </p>
                    {item.price && (
                      <p className="text-[#718096] text-xs mt-0.5">
                        ${item.price} / unit
                      </p>
                    )}
                  </div>
                </div>

                {/* Stepper */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => handleQuantityChange(item, currentQty - 1)}
                    disabled={currentQty === 0}
                    className="w-7 h-7 rounded-md border-2 border-[#e2e8f0] text-[#718096] font-bold text-base leading-none flex items-center justify-center hover:border-[#228b22] hover:text-[#228b22] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={currentQty}
                    onChange={(e) =>
                      handleQuantityChange(item, parseInt(e.target.value) || 0)
                    }
                    name={`quantity_${item._id}`}
                    aria-label={`Quantity for ${item.name}`}
                    className="w-12 text-center text-sm font-semibold text-[#2d3748] border-2 border-[#e2e8f0] rounded-md py-1 px-1 focus:outline-none focus:border-[#228b22] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(item, currentQty + 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="w-7 h-7 rounded-md border-2 border-[#e2e8f0] text-[#718096] font-bold text-base leading-none flex items-center justify-center hover:border-[#228b22] hover:text-[#228b22] transition-colors"
                  >
                    ＋
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showCustomSection && (
        <div className="mt-4 p-4 bg-white border-2 border-[#e2e8f0] rounded-lg shadow-[0_0_0_3px_rgba(34,139,34,0.08)] transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#228b22]">📐</span>
            <h4 className="text-[#2d3748] font-semibold text-sm">
              Custom Pallet Dimensions
            </h4>
          </div>

          {/* Medidas principales */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {[
              { name: "length", label: "Length (in)" },
              { name: "width", label: "Width (in)" },
              { name: "height", label: "Height (in)" },
            ].map(({ name, label }) => (
              <div key={name} className="flex flex-col gap-1">
                <label
                  htmlFor={`dim_${name}`}
                  className="text-[#2d3748] font-semibold text-xs"
                >
                  {label}
                </label>
                <input
                  type="number"
                  id={`dim_${name}`}
                  name={name}
                  min="1"
                  value={customDimensions[name]}
                  onChange={handleDimensionChange}
                  placeholder="0"
                  className="text-sm text-center border-2 border-[#e2e8f0] rounded-md py-1.5 px-2 focus:outline-none focus:border-[#228b22] focus:shadow-[0_0_0_3px_rgba(34,139,34,0.1)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            ))}
          </div>

          {/* Capacidad de peso */}
          <div className="flex flex-col gap-1 mb-3">
            <label
              htmlFor="dim_weightCapacity"
              className="text-[#2d3748] font-semibold text-xs"
            >
              Weight Capacity (lbs)
            </label>
            <input
              type="number"
              id="dim_weightCapacity"
              name="weightCapacity"
              min="1"
              value={customDimensions.weightCapacity}
              onChange={handleDimensionChange}
              placeholder="e.g. 2000"
              className="text-sm border-2 border-[#e2e8f0] rounded-md py-1.5 px-3 focus:outline-none focus:border-[#228b22] focus:shadow-[0_0_0_3px_rgba(34,139,34,0.1)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Notas adicionales del custom */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="dim_notes"
              className="text-[#2d3748] font-semibold text-xs"
            >
              Additional Specifications
            </label>
            <textarea
              id="dim_notes"
              name="notes"
              rows={2}
              value={customDimensions.notes}
              onChange={handleDimensionChange}
              placeholder="Wood type, notch placement, special treatments..."
              className="text-sm border-2 border-[#e2e8f0] rounded-md py-1.5 px-3 resize-none focus:outline-none focus:border-[#228b22] focus:shadow-[0_0_0_3px_rgba(34,139,34,0.1)]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsCatalog;
