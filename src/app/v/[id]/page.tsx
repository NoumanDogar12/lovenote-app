import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedValentine } from "@/actions/valentines";
import { getTemplate } from "@/lib/templates";
import ScrollExperience from "@/components/scroll/ScrollExperience";
import MusicPlayer from "@/components/MusicPlayer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const valentine = await getPublishedValentine(id);

  if (!valentine) {
    return { title: "Valentine Not Found" };
  }

  const title = `A Valentine for ${valentine.recipient_name || "You"}`;
  const description = "Someone created a special Valentine just for you!";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_URL}/v/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ValentinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const valentine = await getPublishedValentine(id);

  if (!valentine) {
    notFound();
  }

  if (valentine.expired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-premium px-4 relative overflow-hidden">
        <div
          className="absolute top-20 left-[20%] w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(244,63,94,0.3) 0%, transparent 70%)" }}
        />
        <div className="text-center max-w-md relative z-10">
          <div className="text-7xl mb-6 opacity-60">{"\u{1F48C}"}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4 font-[var(--font-playfair)]">
            This love letter has been sealed
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            This Valentine has expired, but the love behind it remains forever.
          </p>
        </div>
      </div>
    );
  }

  const template = getTemplate(valentine.template_id);
  if (!template) notFound();

  const messages = Array.isArray(valentine.messages) ? valentine.messages : [];
  const photos = valentine.valentine_photos || [];
  const hasResponded = valentine.valentine_responses?.length > 0;

  return (
    <>
      {valentine.music_url && (
        <MusicPlayer
          musicUrl={valentine.music_url}
          accentColor={template.colors.primary}
        />
      )}
      <ScrollExperience
        recipientName={valentine.recipient_name}
        senderName={valentine.sender_name}
        messages={messages as { section: string; text: string }[]}
        photos={photos}
        askStyle={hasResponded ? "answered" : valentine.ask_style}
        musicUrl={valentine.music_url}
        template={template}
        valentineId={valentine.id}
      />
    </>
  );
}
