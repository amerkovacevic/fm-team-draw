export default function Header() {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-primary-200 bg-white p-8">
      <div className="relative z-10 flex flex-col gap-3 text-center sm:text-left">
        <span className="text-sm uppercase tracking-[0.4em] text-primary-600">Squad Builder</span>
        <h1 className="font-display text-4xl tracking-wide text-primary-900 drop-shadow sm:text-5xl">
          Football Manager Team Draw
        </h1>
        <p className="max-w-2xl text-sm text-primary-700 sm:text-base">
          Quickly spin up a fresh Football Manager save with your friends. Add your managers,
          select the regions you want to explore, and let the draw assign clubs fairly across the
          group.
        </p>
      </div>
      <div className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 rounded-full bg-tertiary-200/30 blur-3xl" />
    </header>
  );
}
