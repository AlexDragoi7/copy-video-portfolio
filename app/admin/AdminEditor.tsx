"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import { deleteProject } from "./actions";
import ProjectForm from "./ProjectForm";

const NEW_PROJECT_ID = "__new__";

export default function AdminEditor({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const editingProject =
    editingId && editingId !== NEW_PROJECT_ID ? projects.find((p) => p.id === editingId) : undefined;

  function handleSaved(project: Project, originalId: string) {
    setProjects((prev) => {
      const index = prev.findIndex((p) => p.id === originalId);
      if (index >= 0) {
        const next = [...prev];
        next[index] = project;
        return next;
      }
      return [...prev, project];
    });
    setEditingId(project.id);
  }

  function handleDelete(id: string) {
    if (!window.confirm(`Delete "${id}"? This can't be undone from here.`)) return;
    startTransition(async () => {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setEditingId((current) => (current === id ? null : current));
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="btn btn-primary w-full"
          onClick={() => setEditingId(NEW_PROJECT_ID)}
        >
          + Add project
        </button>

        <ul className="flex flex-col gap-2">
          {projects.map((project) => (
            <li
              key={project.id}
              className={`flex items-center gap-3 rounded-md border p-2 ${
                editingId === project.id ? "border-accent-600" : "border-divider"
              }`}
            >
              <div className="relative size-12 flex-none overflow-hidden rounded bg-neutral-200">
                {project.image && (
                  <Image src={project.image} alt="" fill sizes="48px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{project.title}</div>
                <div className="truncate text-xs text-text/60">{project.type}</div>
              </div>
              <button
                type="button"
                className="btn btn-icon"
                aria-label={`Edit ${project.title}`}
                onClick={() => setEditingId(project.id)}
              >
                ✎
              </button>
              <button
                type="button"
                className="btn btn-icon"
                aria-label={`Delete ${project.title}`}
                disabled={isPending}
                onClick={() => handleDelete(project.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {editingId ? (
          <ProjectForm
            key={editingId}
            project={editingProject}
            onSaved={handleSaved}
            onCancel={() => setEditingId(null)}
            onDelete={editingProject ? () => handleDelete(editingProject.id) : undefined}
            isDeleting={isPending}
          />
        ) : (
          <p className="text-sm text-text/60">Select a project to edit, or add a new one.</p>
        )}
      </div>
    </div>
  );
}
