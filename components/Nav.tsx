export default function Nav() {
  return (
    <nav className="sticky top-0 z-[200] flex items-center justify-between border-b border-divider bg-neutral-200/90 px-5 py-[18px] backdrop-blur-sm sm:px-8 lg:px-16">
      <span className="font-heading text-[17px]">Alex Dragoi</span>
      <div className="flex gap-7 text-[13px]">
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
