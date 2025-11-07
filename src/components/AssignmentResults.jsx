import clsx from 'clsx';

export default function AssignmentResults({ assignments, onRandomize, loading, canRandomize, error }) {
  return (
    <section className="space-y-4 rounded-3xl border border-tertiary-500/20 bg-gradient-to-br from-secondary-700 via-secondary-700 to-secondary-700 p-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-tertiary-400">Draw</p>
          <h2 className="font-display text-2xl text-accent-50">Assign clubs</h2>
        </div>
        <button
          type="button"
          disabled={!canRandomize || loading}
          onClick={onRandomize}
          className={clsx(
            'rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-widest transition touch-manipulation',
            'bg-tertiary-500 text-accent-50 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0',
            (!canRandomize || loading) && 'cursor-not-allowed bg-tertiary-500/40 text-accent-50/60 shadow-none'
          )}
        >
          {loading ? 'Assigning…' : 'Randomize Teams'}
        </button>
      </header>

      {error ? (
        <p className="rounded-xl border border-warning-500/30 bg-warning-500/10 px-4 py-3 text-sm text-warning-200">{error}</p>
      ) : null}

      {!assignments?.length ? (
        <div className="rounded-2xl border border-dashed border-tertiary-600 bg-secondary-700/60 p-6 text-center text-sm text-quaternary-400">
          Run the draw to see who manages which club.
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {assignments.map((assignment) => (
            <li
              key={`${assignment.player}-${assignment.team}`}
              className="rounded-2xl border border-tertiary-600 bg-secondary-700/70 p-4 shadow-lg shadow-primary-800/20"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-tertiary-400">{assignment.countryFlag}</p>
              <h3 className="mt-2 font-display text-2xl text-accent-50">{assignment.team}</h3>
              <p className="text-sm text-quaternary-300">{assignment.league}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-quaternary-400">Manager</span>
                <span className="font-semibold text-tertiary-400">{assignment.player}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
