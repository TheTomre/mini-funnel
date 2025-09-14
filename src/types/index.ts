export interface UserData {
  email: string;
  name: string;
}

export interface CountdownState {
  isActive: boolean;
  remainingTime: number;
  formattedTime: string;
}

export interface StripeCheckoutRequest {
  mode: "discounted" | "full";
  email?: string;
}

export interface StripeCheckoutResponse {
  url: string;
}

export interface StripePrice {
  id: string;
  amount: number;
  currency: string;
  formatted: string;
}

export interface StripePricesResponse {
  prices: {
    full: StripePrice;
    discounted: StripePrice;
  };
}
