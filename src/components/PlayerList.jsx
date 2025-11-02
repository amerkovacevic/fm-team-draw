export default function PlayerList({ players, onRemove }) {
  if (!players.length) {
    return (
      <div className="rounded-2xl border border-dashed border-tertiary-600 bg-secondary-700/60 p-6 text-center text-sm text-quaternary-400">
        No managers added yet. Add yourself or your friends to start the draw.
      </div>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {players.map((player) => (
        <li
          key={player.id}
          className="flex items-center justify-between rounded-2xl border border-tertiary-500/30 bg-gradient-to-br from-secondary-700/70 to-secondary-700/70 px-4 py-3 text-sm"
        >
          <div>
            <p className="font-semibold text-accent-50">{player.name}</p>
            <p className="text-xs text-quaternary-400">Ready for a new project</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(player.id)}
            className="rounded-full border border-tertiary-600 px-3 py-1 text-xs uppercase tracking-widest text-quaternary-400 transition hover:border-warning-500 hover:text-warning-300 active:border-warning-500 active:text-warning-300 touch-manipulation"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
