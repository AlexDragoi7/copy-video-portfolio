"use client";

import { useEffect, useId, useRef, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

interface WorkModalProps {
  project: Project;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE_SELECTOR = 'button, a[href], [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute("disabled")
  );
}

function renderTextBlocks(text: string) {
  return text.split("\n\n").map((block, i) => {
    const lines = block.split("\n").filter((line) => line.length > 0);
    const isList = lines.length > 1 && lines.every((line) => line.startsWith("- "));
    if (isList) {
      return (
        <ul key={i} className="list-disc space-y-1.5 pl-5">
          {lines.map((line, j) => (
            <li key={j}>{line.slice(2)}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="whitespace-pre-line">
        {block}
      </p>
    );
  });
}

export default function WorkModal({ project, onClose, triggerRef }: WorkModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  const modalImages = project.modalImages ?? [];
  const showCta = Boolean(project.href);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    const triggerNode = triggerRef.current;
    if (!dialogNode) return;

    document.body.classList.add("overflow-hidden");
    dialogNode.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogNode) return;
      const items = getFocusableElements(dialogNode);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("overflow-hidden");
      triggerNode?.focus();
    };
  }, [onClose, triggerRef]);

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-[min(960px,94vw)] max-w-[960px] flex-col gap-5 overflow-y-auto rounded-[10px] bg-neutral-100 p-8 shadow-modal outline-none sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="btn btn-icon absolute top-3 right-3 bg-neutral-200 text-lg hover:bg-neutral-300"
        >
          ×
        </button>

        <span className="tag self-start bg-accent-2-700 text-neutral-100">{project.kicker}</span>
        <h3 id={titleId} className="m-0 font-heading text-[24px] leading-[1.3]">
          {project.title}
        </h3>

        {modalImages.length > 0 && (
          <div className={modalImages.length > 1 ? "grid gap-3 sm:grid-cols-2" : "grid gap-3"}>
            {modalImages.map((src, i) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={`${project.title} — detail ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 380px, 90vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div id={descId} className="flex flex-col gap-5">
          {project.emailContent?.trim() && (
            <div className="rounded-lg border border-divider bg-neutral-200/50 p-5 text-[14.5px] leading-[1.7] text-text/90">
              {(project.emailSubject || project.emailSender) && (
                <div className="mb-4 space-y-0.5 border-b border-divider pb-3 text-[13px] text-text/70">
                  {project.emailSubject && (
                    <div>
                      <span className="font-semibold text-text">Subject:</span> {project.emailSubject}
                    </div>
                  )}
                  {project.emailSender && (
                    <div>
                      <span className="font-semibold text-text">Sender:</span> {project.emailSender}
                    </div>
                  )}
                </div>
              )}
              <div className="space-y-4">{renderTextBlocks(project.emailContent)}</div>
            </div>
          )}
          <div className="text-[15px] leading-[1.7] whitespace-pre-line text-text/90">
            <span className="mb-1.5 block text-[11px] tracking-[0.08em] text-text/50 uppercase">
              About this project
            </span>
            {project.description?.trim() ? project.description : "Write-up coming soon."}
          </div>
        </div>

        {showCta && (
          <Link
            href={project.href as string}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary self-start"
          >
            Visit live site ↗
          </Link>
        )}
      </div>
    </div>
  );
}
