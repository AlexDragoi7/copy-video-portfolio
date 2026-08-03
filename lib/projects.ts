export interface Project {
  id: string;
  kicker: string;
  title: string;
  ratio: string;
  image?: string;
  href?: string;
  emailSubject?: string;
  emailSender?: string;
  emailContent?: string;
  description?: string;
  modalImages?: string[];
}

export const projects: Project[] = [
  {
    id: "fika-email",
    kicker: "Email",
    title: "Fika for Substack — product email",
    ratio: "4/5",
    image: "/work/fika-email-1.png",
    emailSubject: "Discover Fika for Substack — Growth built through appreciation",
    emailSender: "Stefania Barabas",
    emailContent:
      "For a long time, I wanted to build something special for my community, where people can feel genuinely appreciated for their content.\n\nI invite you to try Fika for Substack and share your feedback, so you can enjoy new features and shape this application.\n\nFika for Substack enables you, as a reader or writer, to have a cozy virtual space where you can offer your admiration to someone else in a sweet way 🍰, using the Swedish 'Fika' concept — a break filled with cakes, baked goods and coffee.\n\nDiscover how you can use the app:\n\n- Every week, a fresh cake with 12 slices appears\n- You take a slice by leaving a small note of appreciation for someone whose content made an impact in your life\n- It can be a writer you follow, a fellow reader, a friend, the host (that's me 😊), or just \"the table\"\n- A public appreciation wall keeps every slice forever\n- The cake resets every week, but the appreciation wall builds up week by week\n\nNo accounts, no signup, no follower counts.\n\nCheck out the app at Fika for Substack and follow @StefsDevNotes to receive more updates and news about its development.\n\nThank you,\n\nStefania",
  },
  {
    id: "technical-content",
    kicker: "Technical content",
    title: "Stef's Dev Notes — article collaboration",
    ratio: "1/1",
    href: "https://stefsdevnotes.substack.com/p/engineer-storytelling-skills",
    image: "/work/article-preview.png",
  },
  {
    id: "fika-landing",
    kicker: "Landing page",
    title: "Fika for Substack — landing page copy",
    ratio: "4/3",
    href: "https://fika-for-substack.vercel.app/",
    image: "/work/fika-landing.png"
  },
  {
    id: "fika-email-2",
    kicker: "Email",
    title: "Fika for Substack — product email #2",
    ratio: "3/4",
    image: "/work/fika-email-2.png",
    emailContent:
      "Hi there,\n\nFirst of all, a massive \"THANK YOU ❤️\" for your feedback.\n\nBecause of this, I've just released two improvements in Fika for Substack, aimed at answering your requests and providing you a better user experience.\n\n[CTA - Explore Fika for Substack]\n\nWhat's new in Fika for Substack:\n\nPreview link — A flagship feature allowing you to open the shareable note in a new tab, alongside three new actions.\n\nTo use it, create a note and in the appearing modal, select \"Preview link\". On the new tab, you can select to:\n\n- Copy note & open Substack — copies the note's message plus a shareable link to the clipboard, then opens Substack in a new tab, so the user can paste it into a note.\n- Pass a slice to someone — a call-to-action directing the user back into the \"Pour a coffee, take a slice\" flow and enabling them to take a slice.\n- Subscribe to the person who received the note — if the recipient maps to a Substack profile, a direct link to their page is showcased.\n\nDownload — this feature enables you to share your slice to other social media channels, or save it as an image for yourself.\n\nFika for Substack is evolving with you, so join me in building new features. I'd appreciate it if you could help by providing feedback using this form.\n\nUntil next time,\nStefania",
  },
  {
    id: "universal-app",
    kicker: "Landing page",
    title: "Universal app — landing page (case study)",
    ratio: "4/3",
  },
];

export const blockPalette = [
  "var(--color-accent-600)",
  "var(--color-accent-2-600)",
  "var(--color-accent-800)",
  "var(--color-accent-2-800)",
  "var(--color-accent-700)",
];
