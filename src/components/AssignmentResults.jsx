import clsx from 'clsx';

export default function AssignmentResults({ assignments, onRandomize, loading, canRandomize, error }) {
  return (
    <section className="space-y-4 rounded-3xl border border-emerald/20 bg-gradient-to-br from-slate-900 via-pitch to-slate-900 p-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-emerald">Draw</p>
          <h2 className="font-display text-2xl text-white">Assign clubs</h2>
        </div>
        <button
          type="button"
          disabled={!canRandomize || loading}
          onClick={onRandomize}
          className={clsx(
            'rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-widest transition',
            'bg-emerald text-pitch shadow-glow hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0',
            (!canRandomize || loading) && 'cursor-not-allowed bg-emerald/40 text-pitch/60 shadow-none'
          )}
        >
          {loading ? 'Assigning…' : 'Randomize Teams'}
        </button>
      </header>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
      ) : null}

      {!assignments?.length ? (
        <div className="rounded-2xl border border-dashed border-slate-700/70 bg-slate-900/40 p-6 text-center text-sm text-gray-400">
          Run the draw to see who manages which club.
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {assignments.map((assignment) => (
            <li
              key={`${assignment.player}-${assignment.team}`}
              className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 shadow-lg shadow-black/20"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-emerald">{assignment.countryFlag}</p>
              <h3 className="mt-2 font-display text-2xl text-white">{assignment.team}</h3>
              <p className="text-sm text-gray-300">{assignment.league}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-400">Manager</span>
                <span className="font-semibold text-emerald">{assignment.player}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
