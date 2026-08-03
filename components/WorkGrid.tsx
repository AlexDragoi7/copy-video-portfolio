"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { blockPalette, projects, type Project } from "@/lib/projects";
import WorkModal from "@/components/WorkModal";

interface PlacedProject {
  project: Project;
  originalIndex: number;
}

function relativeHeight(ratio: string) {
  const [width, height] = ratio.split("/").map(Number);
  return height / width;
}

function distributeIntoColumns(items: PlacedProject[], columnCount: number) {
  const columns: PlacedProject[][] = Array.from({ length: columnCount }, () => []);
  const heights = new Array(columnCount).fill(0);

  for (const item of items) {
    let shortest = 0;
    for (let i = 1; i < columnCount; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    columns[shortest].push(item);
    heights[shortest] += relativeHeight(item.project.ratio);
  }

  return columns;
}

export default function WorkGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const activeProject = activeId ? projects.find((p) => p.id === activeId) ?? null : null;

  const placed = projects.map((project, originalIndex) => ({ project, originalIndex }));

  const renderCard = ({ project, originalIndex }: PlacedProject) => {
    const blockColor = blockPalette[originalIndex % blockPalette.length];
    return (
      <button
        key={project.id}
        type="button"
        onClick={(e) => {
          triggerRef.current = e.currentTarget;
          setActiveId(project.id);
        }}
        className="flex w-full transform-gpu flex-col gap-3.5 rounded-card border-none p-5 text-left font-body transition-[transform,box-shadow] duration-[250ms] ease-out hover:scale-[0.99] hover:shadow-card-hover"
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
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top"
              priority={originalIndex < 3}
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
  };

  const renderColumnSet = (columnCount: number) =>
    distributeIntoColumns(placed, columnCount).map((column, i) => (
      <div key={i} className="flex flex-1 flex-col gap-3">
        {column.map(renderCard)}
      </div>
    ));

  return (
    <>
      <section id="work" className="mb-10 px-5 pb-18 sm:px-8 sm:pb-24 lg:px-16 lg:pb-28">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="font-heading text-[clamp(24px,3vw,32px)]">Selected work</h2>
          <span className="text-[13px] text-text/60">Click through to see it in context</span>
        </div>

        <div className="flex gap-3 sm:hidden">{renderColumnSet(1)}</div>
        <div className="hidden gap-3 sm:flex lg:hidden">{renderColumnSet(2)}</div>
        <div className="hidden gap-3 lg:flex">{renderColumnSet(4)}</div>
      </section>

      {activeProject && (
        <WorkModal
          project={activeProject}
          onClose={() => setActiveId(null)}
          triggerRef={triggerRef}
        />
      )}
    </>
  );
}
