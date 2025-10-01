import { useState, useEffect } from "react";

export const useProductsData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_BASE_URL =
      import.meta.env.VITE_API_PRODUCTS || "http://localhost:3000/products";
    const fetchData = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
