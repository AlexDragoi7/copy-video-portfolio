"use server";

import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import type { Project } from "@/lib/projects";

const PROJECTS_JSON_PATH = path.join(process.cwd(), "lib", "projects.json");
const WORK_DIR = path.join(process.cwd(), "public", "work");

function assertDev() {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("The admin editor is only available in local development.");
  }
}

async function readProjects(): Promise<Project[]> {
  const raw = await fs.readFile(PROJECTS_JSON_PATH, "utf8");
  return JSON.parse(raw) as Project[];
}

async function writeProjects(projects: Project[]) {
  await fs.writeFile(PROJECTS_JSON_PATH, JSON.stringify(projects, null, 2) + "\n", "utf8");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extensionFor(file: File) {
  const fromName = path.extname(file.name);
  if (fromName) return fromName.toLowerCase();
  switch (file.type) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
    case "image/webp":
      return ".webp";
    case "image/gif":
      return ".gif";
    default:
      return ".png";
  }
}

async function saveUploadedFile(file: File, filename: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.mkdir(WORK_DIR, { recursive: true });
  await fs.writeFile(path.join(WORK_DIR, filename), buffer);
  return `/work/${filename}`;
}

export interface SaveProjectState {
  success: boolean;
  error?: string;
  project?: Project;
}

export async function saveProject(
  _prevState: SaveProjectState,
  formData: FormData
): Promise<SaveProjectState> {
  assertDev();

  const originalId = String(formData.get("originalId") ?? "");
  const id = slugify(String(formData.get("id") ?? ""));
  const type = String(formData.get("type") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const ratio = String(formData.get("ratio") ?? "").trim();

  if (!id || !type || !title || !ratio) {
    return { success: false, error: "Id, type, title, and ratio are required." };
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
    return { success: false, error: "Id must be a lowercase slug (letters, numbers, hyphens only)." };
  }

  const projects = await readProjects();
  const duplicate = projects.find((p) => p.id === id && p.id !== originalId);
  if (duplicate) {
    return { success: false, error: `A project with id "${id}" already exists.` };
  }

  const href = String(formData.get("href") ?? "").trim();
  const emailSubject = String(formData.get("emailSubject") ?? "").trim();
  const emailSender = String(formData.get("emailSender") ?? "").trim();
  const emailContent = String(formData.get("emailContent") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  let image = String(formData.get("currentImage") ?? "").trim() || undefined;
  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    image = await saveUploadedFile(imageFile, `${id}${extensionFor(imageFile)}`);
  }

  let modalImages: string[] = [];
  try {
    modalImages = JSON.parse(String(formData.get("keptModalImages") ?? "[]"));
  } catch {
    modalImages = [];
  }
  const newModalFiles = formData
    .getAll("modalImages")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  for (const [i, file] of newModalFiles.entries()) {
    const filename = `${id}-modal-${modalImages.length + i + 1}${extensionFor(file)}`;
    modalImages.push(await saveUploadedFile(file, filename));
  }

  const project: Project = {
    id,
    type,
    title,
    ratio,
    ...(image ? { image } : {}),
    ...(href ? { href } : {}),
    ...(emailSubject ? { emailSubject } : {}),
    ...(emailSender ? { emailSender } : {}),
    ...(emailContent ? { emailContent } : {}),
    ...(description ? { description } : {}),
    ...(modalImages.length ? { modalImages } : {}),
  };

  const existingIndex = projects.findIndex((p) => p.id === originalId);
  if (existingIndex >= 0) {
    projects[existingIndex] = project;
  } else {
    projects.push(project);
  }

  await writeProjects(projects);
  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true, project };
}

async function deleteImageFile(publicPath: string) {
  if (!publicPath.startsWith("/work/")) return;
  try {
    await fs.unlink(path.join(WORK_DIR, path.basename(publicPath)));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
  }
}

export async function deleteProject(id: string): Promise<void> {
  assertDev();
  const projects = await readProjects();
  const target = projects.find((p) => p.id === id);
  const remaining = projects.filter((p) => p.id !== id);

  if (target) {
    const stillReferenced = new Set(
      remaining.flatMap((p) => [p.image, ...(p.modalImages ?? [])].filter(Boolean) as string[])
    );
    const imagesToRemove = [target.image, ...(target.modalImages ?? [])].filter(
      (src): src is string => Boolean(src) && !stillReferenced.has(src)
    );
    await Promise.all(imagesToRemove.map(deleteImageFile));
  }

  await writeProjects(remaining);
  revalidatePath("/");
  revalidatePath("/admin");
}
