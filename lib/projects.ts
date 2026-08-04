export interface Project {
  id: string;
  type: string;
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

import data from "./projects.json";

export const projects: Project[] = data as Project[];

export const blockPalette = [
  "var(--color-accent-600)",
  "var(--color-accent-2-600)",
  "var(--color-accent-800)",
  "var(--color-accent-2-800)",
  "var(--color-accent-700)",
];
