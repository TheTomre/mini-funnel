import { useState, useEffect } from "react";
import { pricesApi } from "../utils/api";
import type { StripePrice } from "../types";

interface UseStripePricesReturn {
  prices: {
    full: StripePrice | null;
    discounted: StripePrice | null;
  } | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useStripePrices(): UseStripePricesReturn {
  const [prices, setPrices] = useState<{
    full: StripePrice | null;
    discounted: StripePrice | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await pricesApi.getPrices();
      setPrices(response.prices);
    } catch (err) {
      console.error("Failed to fetch Stripe prices:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load pricing information. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return {
    prices,
    isLoading,
    error,
    refetch: fetchPrices,
  };
}
