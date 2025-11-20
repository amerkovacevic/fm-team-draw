export default function PlayerList({ players, onRemove }) {
  if (!players.length) {
    return (
      <div className="rounded-2xl border border-dashed border-primary-300 bg-white p-6 text-center text-sm text-primary-600">
        No managers added yet. Add yourself or your friends to start the draw.
      </div>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {players.map((player) => (
        <li
          key={player.id}
          className="flex items-center justify-between rounded-2xl border border-primary-200 bg-white px-4 py-3 text-sm"
        >
          <div>
            <p className="font-semibold text-primary-900">{player.name}</p>
            <p className="text-xs text-primary-600">Ready for a new project</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(player.id)}
            className="rounded-full border border-primary-300 px-3 py-1 text-xs uppercase tracking-widest text-primary-600 transition hover:border-warning-500 hover:text-warning-700 active:border-warning-500 active:text-warning-700 touch-manipulation"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
