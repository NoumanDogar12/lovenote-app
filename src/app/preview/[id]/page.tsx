import { redirect } from "next/navigation";
import Link from "next/link";
import { getValentine } from "@/actions/valentines";
import { getTemplate } from "@/lib/templates";
import ScrollExperience from "@/components/scroll/ScrollExperience";
import MusicPlayer from "@/components/MusicPlayer";
import PublishButton from "@/components/PublishButton";

export default async function PreviewPage({
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

  if (!valentine) redirect("/create");

  const template = getTemplate(valentine.template_id);
  if (!template) redirect("/create");

  const messages = Array.isArray(valentine.messages) ? valentine.messages : [];
  const photos = valentine.valentine_photos || [];

  const isDraft = valentine.status === "draft";

  return (
    <>
      {/* Publish bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-rose-100/50 px-4 py-3 shadow-sm shadow-rose-50/30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-lg font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-[var(--font-playfair)]"
            >
              LoveNote
            </Link>
            <span className="text-gray-200">|</span>
            <Link
              href={`/create/${id}`}
              className="text-sm text-gray-400 hover:text-rose-500 transition-colors font-medium"
            >
              &larr; Edit
            </Link>
            <span className="text-sm font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Preview Mode
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isDraft ? (
              <>
                <PublishButton valentineId={id} />
              </>
            ) : (
              <span className="text-sm font-semibold text-emerald-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Published
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Add top padding for the bar */}
      <div className="pt-14">
        {valentine.music_url && (
          <MusicPlayer
            musicUrl={valentine.music_url}
            accentColor={template.colors.primary}
          />
        )}
        <ScrollExperience
          recipientName={valentine.recipient_name || "Your Valentine"}
          senderName={valentine.sender_name || "Your Name"}
          messages={messages as { section: string; text: string }[]}
          photos={photos}
          askStyle={valentine.ask_style}
          musicUrl={valentine.music_url}
          template={template}
          valentineId={valentine.id}
          isPreview={true}
        />
      </div>
    </>
  );
}
