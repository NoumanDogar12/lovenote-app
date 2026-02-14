import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe, PRICE_AMOUNT } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { valentineId } = await request.json();

  if (!valentineId) {
    return NextResponse.json(
      { error: "Valentine ID required" },
      { status: 400 }
    );
  }

  // Verify user owns this valentine and it's a draft
  const { data: valentine, error } = await supabase
    .from("valentines")
    .select("id, status, recipient_name")
    .eq("id", valentineId)
    .eq("user_id", user.id)
    .single();

  if (error || !valentine) {
    return NextResponse.json(
      { error: "Valentine not found" },
      { status: 404 }
    );
  }

  if (valentine.status !== "draft") {
    return NextResponse.json(
      { error: "Valentine is not in draft status" },
      { status: 400 }
    );
  }

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "LoveNote Valentine",
            description: `Valentine for ${valentine.recipient_name || "your special someone"}`,
          },
          unit_amount: PRICE_AMOUNT,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/create/${valentineId}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/preview/${valentineId}`,
    metadata: {
      valentine_id: valentineId,
      user_id: user.id,
    },
  });

  // Update valentine status to payment_pending
  await supabase
    .from("valentines")
    .update({ status: "payment_pending", updated_at: new Date().toISOString() })
    .eq("id", valentineId);

  return NextResponse.json({ url: session.url });
}
