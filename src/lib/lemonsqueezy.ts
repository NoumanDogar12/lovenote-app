import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

export function initLemonSqueezy() {
  lemonSqueezySetup({
    apiKey: process.env.LEMONSQUEEZY_API_KEY!,
  });
}

export const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID!;
export const VARIANT_ID = process.env.LEMONSQUEEZY_VARIANT_ID!;
