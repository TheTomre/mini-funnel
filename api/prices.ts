import Stripe from "stripe";
import dotenv from "dotenv";

if (process.env.VERCEL !== "1") {
  dotenv.config({ path: ".env.local" });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface PriceData {
  id: string;
  amount: number;
  currency: string;
  formatted: string;
}

interface PricesResponse {
  prices: {
    full: PriceData;
    discounted: PriceData;
  };
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: { method: string },
  res: {
    status: (code: number) => {
      json: (data: PricesResponse | ErrorResponse) => void;
    };
  }
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const fullPriceId = process.env.STRIPE_PRICE_FULL;
    const discountedPriceId = process.env.STRIPE_PRICE_DISCOUNTED;

    if (!fullPriceId || !discountedPriceId) {
      return res.status(500).json({
        error:
          "Price configuration missing. Please check environment variables.",
      });
    }

    const [fullPrice, discountedPrice] = await Promise.all([
      stripe.prices.retrieve(fullPriceId),
      stripe.prices.retrieve(discountedPriceId),
    ]);

    const prices = {
      full: {
        id: fullPrice.id,
        amount: fullPrice.unit_amount || 0,
        currency: fullPrice.currency || "usd",
        formatted: formatPrice(
          fullPrice.unit_amount || 0,
          fullPrice.currency || "usd"
        ),
      },
      discounted: {
        id: discountedPrice.id,
        amount: discountedPrice.unit_amount || 0,
        currency: discountedPrice.currency || "usd",
        formatted: formatPrice(
          discountedPrice.unit_amount || 0,
          discountedPrice.currency || "usd"
        ),
      },
    };

    res.status(200).json({ prices });
  } catch (error) {
    console.error("Prices fetch error:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return res.status(400).json({
        error: `Stripe error: ${error.message}`,
      });
    }

    res.status(500).json({
      error: "Failed to fetch prices from Stripe",
    });
  }
}

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount / 100);
}
