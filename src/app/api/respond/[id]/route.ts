import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendResponseNotification } from "@/actions/notifications";
import crypto from "crypto";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const answer = body.answer;

  if (!answer || !["yes", "no"].includes(answer)) {
    return NextResponse.json({ error: "Invalid answer" }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Check valentine exists and is published
  const { data: valentine, error: fetchError } = await supabase
    .from("valentines")
    .select("id, is_published, status, expires_at, user_id")
    .eq("id", id)
    .single();

  if (fetchError || !valentine) {
    return NextResponse.json({ error: "Valentine not found" }, { status: 404 });
  }

  if (!valentine.is_published || valentine.status !== "published") {
    return NextResponse.json({ error: "Valentine not available" }, { status: 404 });
  }

  // Check expiry
  if (valentine.expires_at && new Date(valentine.expires_at) < new Date()) {
    return NextResponse.json({ error: "Valentine has expired" }, { status: 410 });
  }

  // Check for existing response
  const { data: existing } = await supabase
    .from("valentine_responses")
    .select("id")
    .eq("valentine_id", id)
    .single();

  if (existing) {
    return NextResponse.json({ error: "Already responded" }, { status: 409 });
  }

  // Hash IP for duplicate prevention
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);

  // Insert response
  const { error: insertError } = await supabase
    .from("valentine_responses")
    .insert({
      valentine_id: id,
      answer,
      ip_hash: ipHash,
    });

  if (insertError) {
    if (insertError.code === "23505") {
      return NextResponse.json({ error: "Already responded" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to save response" }, { status: 500 });
  }

  // Update valentine status
  await supabase
    .from("valentines")
    .update({ status: "responded" })
    .eq("id", id);

  // Send email notification to sender (non-blocking)
  if (answer === "yes") {
    const { data: senderData } = await supabase
      .from("valentines")
      .select("recipient_name, sender_name, user_id")
      .eq("id", id)
      .single();

    if (senderData) {
      const { data: userData } = await supabase.auth.admin.getUserById(
        senderData.user_id
      );
      if (userData?.user?.email) {
        sendResponseNotification({
          senderEmail: userData.user.email,
          recipientName: senderData.recipient_name,
          senderName: senderData.sender_name,
          valentineId: id,
        }).catch(() => {}); // Fire and forget
      }
    }
  }

  return NextResponse.json({ success: true });
}
