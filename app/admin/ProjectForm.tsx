"use client";

import { useActionState, useEffect, useId, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import { saveProject, type SaveProjectState } from "./actions";

const RATIOS = ["4/5", "1/1", "4/3", "3/4"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface ProjectFormProps {
  project?: Project;
  onSaved: (project: Project, originalId: string) => void;
  onCancel: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

const initialState: SaveProjectState = { success: false };

export default function ProjectForm({
  project,
  onSaved,
  onCancel,
  onDelete,
  isDeleting,
}: ProjectFormProps) {
  const originalId = project?.id ?? "";
  const [state, formAction, isPending] = useActionState(saveProject, initialState);
  const [idTouched, setIdTouched] = useState(Boolean(project));
  const [id, setId] = useState(project?.id ?? "");
  const [keptModalImages, setKeptModalImages] = useState(project?.modalImages ?? []);
  const datalistId = useId();

  useEffect(() => {
    if (state.success && state.project) {
      onSaved(state.project, originalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-5 rounded-lg border border-divider p-6">
      <input type="hidden" name="originalId" value={originalId} />
      <input type="hidden" name="currentImage" value={project?.image ?? ""} />
      <input type="hidden" name="keptModalImages" value={JSON.stringify(keptModalImages)} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className="input"
            defaultValue={project?.title}
            onChange={(e) => {
              if (!idTouched) setId(slugify(e.target.value));
            }}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="id">Id (slug, used in the URL)</label>
          <input
            id="id"
            name="id"
            className="input"
            value={id}
            onChange={(e) => {
              setIdTouched(true);
              setId(e.target.value);
            }}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="type">Type</label>
          <input id="type" name="type" className="input" defaultValue={project?.type} required />
        </div>
        <div className="field">
          <label htmlFor="ratio">Card ratio</label>
          <input
            id="ratio"
            name="ratio"
            className="input"
            defaultValue={project?.ratio}
            list={datalistId}
            placeholder="4/5"
            required
          />
          <datalist id={datalistId}>
            {RATIOS.map((r) => (
              <option key={r} value={r} />
            ))}
          </datalist>
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="href">Link (optional)</label>
          <input
            id="href"
            name="href"
            className="input"
            defaultValue={project?.href}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="input"
          rows={4}
          defaultValue={project?.description}
        />
      </div>

      <fieldset className="rounded-md border border-divider p-4">
        <legend className="px-1 text-xs text-text/70">Product email (optional)</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="field">
            <label htmlFor="emailSubject">Subject</label>
            <input
              id="emailSubject"
              name="emailSubject"
              className="input"
              defaultValue={project?.emailSubject}
            />
          </div>
          <div className="field">
            <label htmlFor="emailSender">Sender</label>
            <input
              id="emailSender"
              name="emailSender"
              className="input"
              defaultValue={project?.emailSender}
            />
          </div>
        </div>
        <div className="field mt-4">
          <label htmlFor="emailContent">Email content</label>
          <textarea
            id="emailContent"
            name="emailContent"
            className="input"
            rows={8}
            defaultValue={project?.emailContent}
            placeholder={
              'Separate paragraphs with a blank line. For a bullet list, start every line of a paragraph with "- ".'
            }
          />
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="image">Cover image</label>
        {project?.image && (
          <div className="relative mb-2 h-32 w-32 overflow-hidden rounded-md bg-neutral-200">
            <Image src={project.image} alt="" fill sizes="128px" className="object-cover" />
          </div>
        )}
        <input id="image" name="image" type="file" accept="image/*" className="input" />
      </div>

      <div className="field">
        <label>Detail images (shown in the modal)</label>
        {keptModalImages.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {keptModalImages.map((src) => (
              <div key={src} className="relative h-20 w-20 overflow-hidden rounded-md bg-neutral-200">
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                <button
                  type="button"
                  className="btn btn-icon absolute top-0 right-0 size-6 bg-neutral-100/90"
                  aria-label="Remove image"
                  onClick={() => setKeptModalImages((prev) => prev.filter((s) => s !== src))}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <input id="modalImages" name="modalImages" type="file" accept="image/*" multiple className="input" />
      </div>

      {state.error && <p className="text-sm text-red-700">{state.error}</p>}
      {state.success && <p className="text-sm text-accent-700">Saved.</p>}

      <div className="flex items-center gap-3">
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending ? "Saving…" : "Save project"}
        </button>
        <button type="button" className="btn border border-divider" onClick={onCancel}>
          Close
        </button>
        {onDelete && (
          <button
            type="button"
            className="btn ml-auto border border-red-800/30 text-red-800 hover:bg-red-800/10"
            disabled={isDeleting}
            onClick={onDelete}
          >
            {isDeleting ? "Deleting…" : "Delete project"}
          </button>
        )}
      </div>
    </form>
  );
}
