export default function Header() {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-tertiary-500/30 bg-gradient-to-br from-secondary-700 via-secondary-700 to-primary-800 p-8 shadow-glow">
      <div className="relative z-10 flex flex-col gap-3 text-center sm:text-left">
        <span className="text-sm uppercase tracking-[0.4em] text-tertiary-400">Squad Builder</span>
        <h1 className="font-display text-4xl tracking-wide text-accent-50 drop-shadow sm:text-5xl">
          Football Manager Team Draw
        </h1>
        <p className="max-w-2xl text-sm text-quaternary-300 sm:text-base">
          Quickly spin up a fresh Football Manager save with your friends. Add your managers,
          select the regions you want to explore, and let the draw assign clubs fairly across the
          group.
        </p>
      </div>
      <div className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 rounded-full bg-tertiary-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-16 h-56 w-56 rounded-full bg-warning-300/10 blur-3xl" />
    </header>
  );
}
