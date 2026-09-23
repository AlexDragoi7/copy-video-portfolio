export default function Contact() {
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
          I&apos;m here to support your business, so I&apos;d love to hear your idea and what you need written. Just send me an email and I will get back to you as soon as possible.
          {/* Tell me what you&apos;re working on and what you need written — I&apos;ll get back to
          you within a couple of days. */}
        </p>
        <a href="mailto:alex@alexandrudragoi.com" className="btn btn-primary">
          alex@alexandrudragoi.com
        </a>
      </div>
    </section>
  );
}
