import clsx from 'clsx';

export default function AssignmentResults({ assignments, onRandomize, loading, canRandomize, error }) {
  return (
    <section className="space-y-4 rounded-3xl border border-primary-200 bg-white p-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-primary-600">Draw</p>
          <h2 className="font-display text-2xl text-primary-900">Assign clubs</h2>
        </div>
        <button
          type="button"
          disabled={!canRandomize || loading}
          onClick={onRandomize}
          className={clsx(
            'rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-widest transition touch-manipulation',
            'bg-tertiary-100 text-tertiary-700 hover:-translate-y-0.5 hover:bg-tertiary-200 hover:shadow-xl active:translate-y-0',
            (!canRandomize || loading) && 'cursor-not-allowed bg-primary-200 text-primary-500 shadow-none'
          )}
        >
          {loading ? 'Assigning…' : 'Randomize Teams'}
        </button>
      </header>

      {error ? (
        <p className="rounded-xl border border-warning-300 bg-warning-100 px-4 py-3 text-sm text-warning-700">{error}</p>
      ) : null}

      {!assignments?.length ? (
        <div className="rounded-2xl border border-dashed border-primary-300 bg-accent-100 p-6 text-center text-sm text-primary-600">
          Run the draw to see who manages which club.
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {assignments.map((assignment) => (
            <li
              key={`${assignment.player}-${assignment.team}`}
              className="rounded-2xl border border-primary-200 bg-white p-4 shadow-lg"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-primary-600">{assignment.countryFlag}</p>
              <h3 className="mt-2 font-display text-2xl text-primary-900">{assignment.team}</h3>
              <p className="text-sm text-primary-700">{assignment.league}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-primary-600">Manager</span>
                <span className="font-semibold text-primary-900">{assignment.player}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
