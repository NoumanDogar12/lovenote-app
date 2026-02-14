import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const valentineId = session.metadata?.valentine_id;
      const userId = session.metadata?.user_id;

      if (!valentineId || !userId) {
        console.error("Missing metadata in checkout session");
        break;
      }

      // Idempotency check - don't re-process if already published
      const { data: existing } = await supabase
        .from("valentines")
        .select("status")
        .eq("id", valentineId)
        .single();

      if (existing?.status === "published") {
        break;
      }

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
        stripe_session_id: session.id,
        stripe_payment_intent_id:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id || null,
        amount_cents: session.amount_total || 999,
        status: "completed",
      });

      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const valentineId = session.metadata?.valentine_id;

      if (valentineId) {
        // Revert to draft so user can retry
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
