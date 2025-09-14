import axios from "axios";
import type {
  StripeCheckoutRequest,
  StripeCheckoutResponse,
  StripePricesResponse,
} from "../types";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export const checkoutApi = {
  createSession: async (
    data: StripeCheckoutRequest
  ): Promise<StripeCheckoutResponse> => {
    const response = await api.post("/checkout", data);
    return response.data;
  },
};

export const pricesApi = {
  getPrices: async (): Promise<StripePricesResponse> => {
    const response = await api.get("/prices");
    return response.data;
  },
};
