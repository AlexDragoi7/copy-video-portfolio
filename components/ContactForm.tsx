"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-divider px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="max-w-[720px]">
        <span className="mb-4 block text-[13px] tracking-[0.08em] text-accent-800 uppercase">
          Get in touch
        </span>
        <h2 className="mb-4 font-heading text-[clamp(28px,3.5vw,40px)] leading-[1.2]">
          Let&apos;s talk about your project.
        </h2>
        <p className="mb-8 max-w-[46ch] text-[15.5px] leading-[1.65] text-text/90">
          Tell me what you&apos;re working on and what you need written — I&apos;ll get back to
          you within a couple of days.
        </p>
        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="cf-name">Name</label>
            <input className="input" id="cf-name" name="name" type="text" placeholder="Your name" required />
          </div>
          <div className="field">
            <label htmlFor="cf-email">Email</label>
            <input
              className="input"
              id="cf-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="field sm:col-span-2">
            <label htmlFor="cf-message">Project</label>
            <textarea
              className="input resize-y font-body"
              id="cf-message"
              name="message"
              rows={4}
              placeholder="A line or two about what you need"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
            {status === "success" && (
              <p className="mt-3 text-sm text-accent-700">Thanks — I&apos;ll be in touch soon.</p>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-accent-2-700">{errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
