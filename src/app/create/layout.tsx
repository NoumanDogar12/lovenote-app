import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choose a Valentine Template - Create Your Personalized Valentine",
  description:
    "Pick from 6 beautiful valentine templates to create your personalized 'Will You Be My Valentine?' website. Classic romance, dark romance, playful, minimalist & more.",
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
