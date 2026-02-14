import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { initLemonSqueezy, STORE_ID, VARIANT_ID } from "@/lib/lemonsqueezy";

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

  // Create LemonSqueezy Checkout
  initLemonSqueezy();

  const { data: checkout, error: lsError } = await createCheckout(STORE_ID, VARIANT_ID, {
    checkoutData: {
      email: user.email || undefined,
      custom: {
        valentine_id: valentineId,
        user_id: user.id,
      },
    },
    productOptions: {
      name: "LoveNote Valentine",
      description: `Valentine for ${valentine.recipient_name || "your special someone"}`,
      redirectUrl: `${process.env.NEXT_PUBLIC_URL}/create/${valentineId}/success`,
    },
  });

  if (lsError || !checkout) {
    console.error("LemonSqueezy checkout error:", lsError);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }

  // Update valentine status to payment_pending
  await supabase
    .from("valentines")
    .update({ status: "payment_pending", updated_at: new Date().toISOString() })
    .eq("id", valentineId);

  const checkoutUrl = checkout.data.attributes.url;

  return NextResponse.json({ url: checkoutUrl });
}
