// useHomeData.test.js
// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useHomeData } from "./useHomeData";

describe("useHomeData hook", () => {
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
    const { result } = renderHook(() => useHomeData());

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("fetches and returns data successfully", async () => {
    const mockData = {
      features: {
        title: "Our Product Range",
        description: "Home page description",
        products: [
          {
            icon: "🆕",
            name: "Standard Pallets",
            description: "Standard pallets description",
          },
        ],
      },
      whyChooseUs: {
        title: "Why Choose QS Pallets?",
        description: "Why you should choose us",
        features: [
          {
            icon: "⚡",
            title: "Custom Solutions",
            description: "Features Description.",
          },
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

    const { result } = renderHook(() => useHomeData());

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

    const { result } = renderHook(() => useHomeData());

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

    const { result } = renderHook(() => useHomeData());

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

    renderHook(() => useHomeData());

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

    const { rerender } = renderHook(() => useHomeData());

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    // Rerender shouldn't trigger another fetch
    rerender();

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
