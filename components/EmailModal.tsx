import type { Project } from "@/lib/projects";

interface EmailModalProps {
  project: Project;
  onClose: () => void;
}

export default function EmailModal({ project, onClose }: EmailModalProps) {
  const stopClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        className="flex max-h-[86vh] w-[min(780px,94vw)] max-w-[780px] flex-col overflow-hidden rounded-[10px] bg-neutral-100 shadow-modal"
        onClick={stopClick}
      >
        <div className="flex items-center gap-2 border-b border-divider bg-neutral-300 px-3.5 py-2.5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            title="Close"
            className="flex gap-1.5 border-none bg-transparent p-0"
          >
            <span className="size-2.5 rounded-full bg-[#E4685D]" />
            <span className="size-2.5 rounded-full bg-[#E8B03D]" />
            <span className="size-2.5 rounded-full bg-[#57C33E]" />
          </button>
          <div className="mx-10 flex-1 rounded-md bg-neutral-100 px-2.5 py-1 text-center text-xs text-text/55">
            mail.app/inbox/{project.id}
          </div>
          <button type="button" className="btn btn-icon flex-none text-base" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[160px_1fr]">
          <aside className="flex flex-col gap-1 border-r border-divider p-4 text-[13px]">
            <span className="mb-2.5 font-semibold">Inbox</span>
            <span className="text-text/55">Sent</span>
            <span className="text-text/55">Drafts</span>
            <span className="text-text/55">Archive</span>
          </aside>
          <div className="overflow-y-auto px-8 py-6">
            <span className="text-[10px] tracking-[0.1em] text-accent-700 uppercase">{project.kicker}</span>
            <h3 className="mt-1.5 mb-3.5 font-heading text-[22px]">{project.emailSubject}</h3>
            <div className="mb-4 flex items-center gap-2.5 border-b border-divider pb-3.5 text-[13px]">
              <span className="flex size-8 flex-none items-center justify-center rounded-full bg-accent-300 font-heading text-[13px]">
                {project.emailInitial}
              </span>
              <div>
                <div className="font-semibold">{project.emailFrom}</div>
                <div className="text-text/55">to me</div>
              </div>
            </div>
            <div className="text-[14.5px] leading-[1.7] whitespace-pre-line text-text/90">
              {project.emailBody}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
