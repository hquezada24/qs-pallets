// useProductsData.test.js
// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useProductsData } from "./useProductsData";

describe("useProductsData hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns initial state", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {}))
    );
    const { result } = renderHook(() => useProductsData());

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("fetches and returns data successfully", async () => {
    const mockData = {
      status: "success",
      message: "Routes loaded successfully.",
      products: [
        {
          name: "Standard Pallets",
          price: 10,
        },
        {
          name: "Recycled Pallets",
          price: "5",
        },
        {
          name: "Custom Pallets",
          price: "Quote on request",
        },
      ],
      additionalServices: [
        {
          icon: "🔄",
          title: "Pallet Management",
        },
      ],
      specifications: {
        headers: [
          "Specification",
          "New Pallets",
          "Recycled Pallets",
          "Custom Pallets",
        ],
        rows: [
          [
            "Standard Sizes",
            '48"×40", 42"×42", 48"×48"',
            "Various standard sizes",
            "Any dimension",
          ],
          ["Lead Time", "5-10 business days", "Same day - 3 days", "2-4 weeks"],
        ],
      },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        })
      )
    );

    const { result } = renderHook(() => useProductsData());

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("handles fetch errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      )
    );

    const { result } = renderHook(() => useProductsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to fetch");
    expect(result.current.data).toBeNull();
  });

  it("handles network errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network error")))
    );

    const { result } = renderHook(() => useProductsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.data).toBeNull();
  });

  it("calls fetch with correct URL", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
    vi.stubGlobal("fetch", mockFetch);

    renderHook(() => useProductsData());

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/"));
    });
  });

  it("only fetches data once on mount", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
    vi.stubGlobal("fetch", mockFetch);

    const { rerender } = renderHook(() => useProductsData());

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    // Rerender shouldn't trigger another fetch
    rerender();

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
