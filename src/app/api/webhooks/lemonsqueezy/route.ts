import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  // Verify webhook signature (HMAC SHA-256)
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
  const sig = Buffer.from(signature, "utf8");

  if (!crypto.timingSafeEqual(digest, sig)) {
    console.error("Webhook signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);
  const eventName: string = event.meta?.event_name;
  const customData = event.meta?.custom_data;
  const supabase = createServiceClient();

  switch (eventName) {
    case "order_created": {
      const valentineId = customData?.valentine_id;
      const userId = customData?.user_id;

      if (!valentineId || !userId) {
        console.error("Missing custom_data in order_created event");
        break;
      }

      // Idempotency check
      const { data: existing } = await supabase
        .from("valentines")
        .select("status")
        .eq("id", valentineId)
        .single();

      if (existing?.status === "published") {
        break;
      }

      const orderData = event.data?.attributes;
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

      // Publish the valentine
      await supabase
        .from("valentines")
        .update({
          status: "published",
          is_published: true,
          published_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
          share_link: `${process.env.NEXT_PUBLIC_URL}/v/${valentineId}`,
          updated_at: now.toISOString(),
        })
        .eq("id", valentineId);

      // Record payment
      await supabase.from("payments").insert({
        user_id: userId,
        valentine_id: valentineId,
        stripe_session_id: String(orderData?.order_number || event.data?.id || ""),
        stripe_payment_intent_id: String(event.data?.id || ""),
        amount_cents: orderData?.total || 999,
        status: "completed",
      });

      break;
    }

    case "order_refunded": {
      const valentineId = customData?.valentine_id;

      if (valentineId) {
        await supabase
          .from("valentines")
          .update({
            status: "draft",
            updated_at: new Date().toISOString(),
          })
          .eq("id", valentineId);
      }

      break;
    }
  }

  return NextResponse.json({ received: true });
}
