import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/projects";
import AdminEditor from "./AdminEditor";

export default function AdminPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <header className="mb-8">
        <h1 className="font-heading text-2xl">Selected Work — admin</h1>
        <p className="mt-1 text-sm text-text/70">
          Local-only editor for the projects shown on the homepage. Changes write straight to{" "}
          <code>lib/projects.json</code> and <code>public/work</code> — verify on{" "}
          <Link href="/" className="underline">
            the homepage
          </Link>
          , then commit, push, and open a PR from your terminal as usual.
        </p>
      </header>
      <AdminEditor initialProjects={projects} />
    </div>
  );
}
