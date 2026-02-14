import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getValentine } from "@/actions/valentines";
import CustomizeForm from "./customize-form";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function CustomizePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let valentine;
  try {
    valentine = await getValentine(id);
  } catch {
    redirect("/create");
  }

  if (!valentine || valentine.status !== "draft") {
    redirect("/dashboard");
  }

  return (
    <CustomizeForm
      valentine={valentine}
      photos={valentine.valentine_photos || []}
    />
  );
}
