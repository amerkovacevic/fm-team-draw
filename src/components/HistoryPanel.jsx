import dayjs from 'dayjs';

const formatDate = (value) => {
  if (!value) return 'moments ago';
  const date = dayjs(value);
  if (!date.isValid()) return 'moments ago';
  return date.format('MMM D • HH:mm');
};

export default function HistoryPanel({ history, source }) {
  const storageLabel = source === 'browser' ? 'browser storage' : `${source} storage`;

  if (!history.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-6 text-sm text-gray-400">
        Once you run the draw, we will keep a short log of recent assignments here.
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <header className="flex items-center justify-between">
        <h2 className="font-display text-xl text-white">Recent draws</h2>
        <span className="text-xs uppercase tracking-[0.35em] text-gray-500">{storageLabel}</span>
      </header>
      <ul className="mt-4 space-y-3">
        {history.slice(0, 6).map((entry) => (
          <li
            key={entry.id ?? `${entry.timestamp}-${entry.players?.join('-')}`}
            className="rounded-2xl border border-slate-800/70 bg-pitch/60 px-4 py-3 text-sm text-gray-200"
          >
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{formatDate(entry.createdAt ?? entry.timestamp)}</span>
              <span>{entry.context?.filtersSummary ?? 'Custom brief'}</span>
            </div>
            <div className="mt-2 space-y-1">
              {entry.assignments?.map((assignment) => (
                <p key={`${assignment.player}-${assignment.team}`} className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-400">{assignment.player}</span>
                  <span className="font-semibold text-white">
                    {assignment.team}
                    <span className="ml-2 text-xs text-gray-400">{assignment.league}</span>
                  </span>
                </p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
