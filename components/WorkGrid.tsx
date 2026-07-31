"use client";

import { useState } from "react";
import Image from "next/image";
import { blockPalette, projects, type Project } from "@/lib/projects";
import EmailModal from "@/components/EmailModal";

export default function WorkGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = activeId ? projects.find((p) => p.id === activeId) ?? null : null;

  const openProject = (project: Project) => {
    if (project.type === "link") {
      window.open(project.href, "_blank", "noopener,noreferrer");
      return;
    }
    setActiveId(project.id);
  };

  return (
    <>
      <section id="work" className="mb-10 px-5 pb-18 sm:px-8 sm:pb-24 lg:px-16 lg:pb-28">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="font-heading text-[clamp(24px,3vw,32px)]">Selected work</h2>
          <span className="text-[13px] text-text/60">Click through to see it in context</span>
        </div>

        <div style={{ columns: "3 280px", columnGap: "12px" }}>
          {projects.map((project, index) => {
            const blockColor = blockPalette[index % blockPalette.length];
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => openProject(project)}
                className="mb-3 flex w-full break-inside-avoid flex-col gap-3.5 rounded-card border-none p-5 text-left font-body transition-transform duration-[250ms] ease-out hover:scale-[0.99] hover:shadow-card-hover"
                style={{ background: blockColor, aspectRatio: project.ratio }}
              >
                <span className="tag self-start bg-neutral-100/90" style={{ color: blockColor }}>
                  {project.kicker}
                </span>
                <figure className="relative m-0 min-h-0 flex-1 overflow-hidden rounded-lg">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
                  )}
                </figure>
                <h3 className="m-0 font-heading text-[19px] leading-[1.3] text-neutral-100">
                  {project.title}
                </h3>
              </button>
            );
          })}
        </div>
      </section>

      {activeProject && activeProject.type === "email" && (
        <EmailModal project={activeProject} onClose={() => setActiveId(null)} />
      )}
    </>
  );
}
