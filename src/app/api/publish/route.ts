import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// TODO: Remove this route when payment is enabled — publishing should only happen via webhook
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
    .select("id, status")
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
      { error: "Valentine is already published" },
      { status: 400 }
    );
  }

  // Directly publish — skip payment for testing
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const { error: updateError } = await supabase
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

  if (updateError) {
    console.error("Publish error:", updateError);
    return NextResponse.json(
      { error: "Failed to publish" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
