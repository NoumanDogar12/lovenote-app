export interface TemplateTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  particleColors: string[];
  animationStyle: "gentle" | "dramatic" | "bouncy" | "smooth" | "parallax" | "whimsical";
  previewGradient: string;
}

export const templates: TemplateTheme[] = [
  {
    id: "classic_romance",
    name: "Classic Romance",
    description: "Rich reds, blush pinks, rose gold accents with elegant serif typography",
    colors: {
      primary: "#C41E3A",
      secondary: "#FFB6C1",
      accent: "#B76E79",
      background: "#FFFFF0",
      text: "#8B0000",
    },
    fonts: {
      heading: "var(--font-playfair)",
      body: "var(--font-lato)",
    },
    particleColors: ["#C41E3A", "#FFB6C1", "#B76E79"],
    animationStyle: "gentle",
    previewGradient: "linear-gradient(135deg, #FFFFF0, #FFB6C1, #C41E3A)",
  },
  {
    id: "dark_romance",
    name: "Dark Romance",
    description: "Dramatic black and crimson with gold accents for a moody, elegant feel",
    colors: {
      primary: "#DC143C",
      secondary: "#8E4585",
      accent: "#FFD700",
      background: "#0A0A0A",
      text: "#FFD700",
    },
    fonts: {
      heading: "var(--font-cormorant)",
      body: "var(--font-inter)",
    },
    particleColors: ["#DC143C", "#FFD700", "#8E4585"],
    animationStyle: "dramatic",
    previewGradient: "linear-gradient(135deg, #0A0A0A, #DC143C, #FFD700)",
  },
  {
    id: "playful_cute",
    name: "Playful & Cute",
    description: "Pastel pinks with bouncy animations and fun, rounded typography",
    colors: {
      primary: "#FF69B4",
      secondary: "#FFB7D5",
      accent: "#FF1493",
      background: "#FFF0F5",
      text: "#FF69B4",
    },
    fonts: {
      heading: "var(--font-quicksand)",
      body: "var(--font-nunito)",
    },
    particleColors: ["#FF69B4", "#FFB7D5", "#FF1493", "#FFD1DC"],
    animationStyle: "bouncy",
    previewGradient: "linear-gradient(135deg, #FFF0F5, #FFB7D5, #FF69B4)",
  },
  {
    id: "minimalist",
    name: "Minimalist Elegant",
    description: "Clean white space with subtle coral accents and refined typography",
    colors: {
      primary: "#E8787A",
      secondary: "#F5F5F5",
      accent: "#333333",
      background: "#FFFFFF",
      text: "#333333",
    },
    fonts: {
      heading: "var(--font-dm-serif)",
      body: "var(--font-dm-sans)",
    },
    particleColors: ["#E8787A", "#F5C6C7"],
    animationStyle: "smooth",
    previewGradient: "linear-gradient(135deg, #FFFFFF, #F5F5F5, #E8787A)",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Full-bleed photos with parallax depth and dramatic, bold typography",
    colors: {
      primary: "#8B0000",
      secondary: "#2C2C2C",
      accent: "#C9A96E",
      background: "#1A1A1A",
      text: "#F5F5F5",
    },
    fonts: {
      heading: "var(--font-bebas)",
      body: "var(--font-source-sans)",
    },
    particleColors: [],
    animationStyle: "parallax",
    previewGradient: "linear-gradient(135deg, #1A1A1A, #2C2C2C, #8B0000)",
  },
  {
    id: "storybook",
    name: "Illustrated Storybook",
    description: "Hand-drawn style with watercolor textures and whimsical animations",
    colors: {
      primary: "#E2725B",
      secondary: "#9CAF88",
      accent: "#C2B280",
      background: "#FAF3E8",
      text: "#5C4033",
    },
    fonts: {
      heading: "var(--font-caveat)",
      body: "var(--font-poppins)",
    },
    particleColors: ["#E2725B", "#9CAF88", "#C2B280"],
    animationStyle: "whimsical",
    previewGradient: "linear-gradient(135deg, #FAF3E8, #E2725B, #9CAF88)",
  },
];

export function getTemplate(id: string): TemplateTheme | undefined {
  return templates.find((t) => t.id === id);
}

export const askStyles = [
  {
    id: "playful_dodge",
    name: "Playful Dodge",
    description: "The 'No' button playfully runs away — they can only say Yes!",
    emoji: "😜",
  },
  {
    id: "cute_guilt",
    name: "Cute Guilt Trip",
    description: "Clicking 'No' triggers an adorable sad face that asks again",
    emoji: "🥺",
  },
  {
    id: "sincere",
    name: "Sincere",
    description: "Clean, heartfelt Yes/No — simple and genuine",
    emoji: "💕",
  },
] as const;

export type AskStyle = (typeof askStyles)[number]["id"];
