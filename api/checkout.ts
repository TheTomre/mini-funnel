import Stripe from "stripe";
import dotenv from "dotenv";

if (process.env.VERCEL !== "1") {
  dotenv.config({ path: ".env.local" });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: { method: string; body: { mode?: string; email?: string } },
  res: {
    status: (code: number) => {
      json: (data: { error?: string; url?: string | null }) => void;
    };
  }
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { mode, email } = req.body;

    if (!mode || !["discounted", "full"].includes(mode)) {
      return res
        .status(400)
        .json({ error: 'Invalid mode. Must be "discounted" or "full"' });
    }

    const priceId =
      mode === "discounted"
        ? process.env.STRIPE_PRICE_DISCOUNTED
        : process.env.STRIPE_PRICE_FULL;

    if (!priceId) {
      return res.status(500).json({ error: "Price configuration missing" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      ...(email && { customer_email: email }),
      success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/product`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
}
