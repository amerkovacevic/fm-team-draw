export default function PlayerList({ players, onRemove }) {
  if (!players.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-850/60 p-6 text-center text-sm text-gray-400">
        No managers added yet. Add yourself or your friends to start the draw.
      </div>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {players.map((player) => (
        <li
          key={player.id}
          className="flex items-center justify-between rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-pitch/70 px-4 py-3 text-sm"
        >
          <div>
            <p className="font-semibold text-white">{player.name}</p>
            <p className="text-xs text-gray-400">Ready for a new project</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(player.id)}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-widest text-gray-400 transition hover:border-red-500 hover:text-red-300"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
