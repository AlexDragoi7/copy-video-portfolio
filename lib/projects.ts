export type ProjectType = "email" | "link";

export interface Project {
  id: string;
  kicker: string;
  title: string;
  ratio: string;
  type: ProjectType;
  image?: string;
  href?: string;
  emailSubject?: string;
  emailFrom?: string;
  emailInitial?: string;
  emailBody?: string;
}

export const projects: Project[] = [
  {
    id: "fika-email",
    kicker: "Email",
    title: "Fika for Substack — product email",
    ratio: "4/5",
    type: "email",
    image: "/work/fika-email-1.png",
    emailSubject: "Welcome to Glow & Co. — here's where to start",
    emailFrom: "Glow & Co.",
    emailInitial: "G",
    emailBody:
      "Hey there,\n\nGlad you're here. Before anything else, one thing worth knowing: your skin doesn't need eight steps, it needs the right two.\n\nOver the next few days I'll walk you through exactly which ones — no fluff, no 12-step routines you'll abandon by Thursday.\n\nFirst up: cleanser. More on that tomorrow.\n\n— The Glow & Co. team",
  },
  {
    id: "technical-content",
    kicker: "Technical content",
    title: "Stef's Dev Notes — article collaboration",
    ratio: "1/1",
    type: "link",
    href: "https://stefsdevnotes.substack.com/p/engineer-storytelling-skills",
    image: "/work/article-preview.png",
  },
  {
    id: "fika-landing",
    kicker: "Landing page",
    title: "Fika for Substack — landing page copy",
    ratio: "4/3",
    type: "link",
    href: "https://fika-for-substack.vercel.app/",
    image: "/work/fika-landing.png"
  },
  {
    id: "fika-email-2",
    kicker: "Email",
    title: "Fika for Substack — product email #2",
    ratio: "3/4",
    type: "email",
    image: "/work/fika-email-2.png",
    emailSubject: "Welcome to Glow & Co. — here's where to start",
    emailFrom: "Glow & Co.",
    emailInitial: "G",
    emailBody:
      "Hey there,\n\nGlad you're here. Before anything else, one thing worth knowing: your skin doesn't need eight steps, it needs the right two.\n\nOver the next few days I'll walk you through exactly which ones — no fluff, no 12-step routines you'll abandon by Thursday.\n\nFirst up: cleanser. More on that tomorrow.\n\n— The Glow & Co. team",
  },
  {
    id: "hearth",
    kicker: "Landing page",
    title: "Universal app — landing page (case study)",
    ratio: "4/3",
    type: "link",
    href: "https://example.com/hearth",
  },
];

export const blockPalette = [
  "var(--color-accent-600)",
  "var(--color-accent-2-600)",
  "var(--color-accent-800)",
  "var(--color-accent-2-800)",
  "var(--color-accent-700)",
];
