import { useState } from 'react';

export default function PlayerForm({ players = [], onAddPlayer, onRemovePlayer }) {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = playerName.trim();
    if (!trimmed) return;
    onAddPlayer(trimmed);
    setPlayerName('');
  };

  return (
    <section className="flex h-full flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-850/70 p-6 shadow-lg shadow-black/20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="player" className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Add player
          </label>
          <input
            id="player"
            type="text"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="e.g. Alex Ferguson"
            className="w-full rounded-xl border border-slate-700 bg-pitch/80 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-azure focus:ring-2 focus:ring-azure/50"
          />
        </div>
        <button
          type="submit"
          className="mt-2 rounded-xl bg-azure px-6 py-3 text-sm font-semibold uppercase tracking-widest text-pitch transition hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 sm:mt-0"
        >
          Add
        </button>
      </form>

      <div className="flex flex-1 flex-col rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-inner shadow-black/10">
        <header className="flex items-center justify-between pb-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">Managers</h2>
          <span className="text-xs text-gray-500">{players.length} added</span>
        </header>
        {players.length ? (
          <ul className="grid flex-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
            {players.map((player) => (
              <li
                key={player.id}
                className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-gradient-to-br from-slate-900/70 to-pitch/70 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-white">{player.name}</p>
                  <p className="text-xs text-gray-400">Ready for a new project</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemovePlayer(player.id)}
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-widest text-gray-400 transition hover:border-red-500 hover:text-red-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 text-center text-sm text-gray-400">
            No managers added yet. Add yourself or your friends to start the draw.
          </div>
        )}
      </div>
    </section>
  );
}
