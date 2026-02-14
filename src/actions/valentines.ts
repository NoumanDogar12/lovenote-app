"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createValentine(templateId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("valentines")
    .insert({
      user_id: user.id,
      template_id: templateId,
      status: "draft",
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  return data.id;
}

export async function updateValentine(
  id: string,
  updates: {
    recipient_name?: string;
    sender_name?: string;
    messages?: { section: string; text: string }[];
    ask_style?: string;
    music_url?: string;
    template_id?: string;
  }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("valentines")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}

export async function getValentine(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("valentines")
    .select("*, valentine_photos(*)")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getMyValentines() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("valentines")
    .select("*, valentine_photos(count), valentine_responses(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function uploadPhoto(valentineId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File too large. Maximum 5MB.");
  }

  // Check photo count
  const { count } = await supabase
    .from("valentine_photos")
    .select("*", { count: "exact", head: true })
    .eq("valentine_id", valentineId);

  if (count && count >= 10) {
    throw new Error("Maximum 10 photos allowed.");
  }

  const timestamp = Date.now();
  const ext = file.name.split(".").pop();
  const filePath = `${user.id}/${valentineId}/${timestamp}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("valentine-photos")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw new Error(uploadError.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from("valentine-photos").getPublicUrl(filePath);

  const { data, error } = await supabase
    .from("valentine_photos")
    .insert({
      valentine_id: valentineId,
      storage_path: filePath,
      public_url: publicUrl,
      sort_order: count || 0,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath(`/create/${valentineId}`);
  return data;
}

export async function deletePhoto(photoId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Get photo to find storage path
  const { data: photo } = await supabase
    .from("valentine_photos")
    .select("storage_path, valentine_id")
    .eq("id", photoId)
    .single();

  if (!photo) throw new Error("Photo not found");

  // Delete from storage
  await supabase.storage.from("valentine-photos").remove([photo.storage_path]);

  // Delete from database
  await supabase.from("valentine_photos").delete().eq("id", photoId);

  revalidatePath(`/create/${photo.valentine_id}`);
}

export async function reorderPhotos(valentineId: string, photoIds: string[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const updates = photoIds.map((id, index) =>
    supabase
      .from("valentine_photos")
      .update({ sort_order: index })
      .eq("id", id)
      .eq("valentine_id", valentineId)
  );

  await Promise.all(updates);
  revalidatePath(`/create/${valentineId}`);
}

export async function getPublishedValentine(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("valentines")
    .select("*, valentine_photos(*), valentine_responses(*)")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (error) return null;

  // Check expiry
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return { ...data, expired: true };
  }

  return { ...data, expired: false };
}
