"use client";

import { useEffect, useState, useCallback, type DependencyList } from "react";

import { apiRequest } from "@/lib/apiRequest";

type UseApiQueryOptions = {
  deps?: DependencyList;
  enabled?: boolean;
};

export function useApiQuery<T>(
  path: string,
  { deps = [], enabled = true }: UseApiQueryOptions = {},
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiRequest(path);
      const result: T = await response.json();

      setData(result);
      return result;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch data";

      setError(message);
      console.error(`Request failed for ${path}:`, message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    fetchData();
  }, [path, enabled, ...deps, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
