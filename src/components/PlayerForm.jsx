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
    <section className="flex h-full flex-col gap-6 rounded-2xl border border-tertiary-500/30 bg-secondary-700/70 p-6 shadow-lg shadow-primary-800/20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="player" className="text-xs font-semibold uppercase tracking-wide text-quaternary-400">
            Add player
          </label>
          <input
            id="player"
            type="text"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="e.g. Alex Ferguson"
            className="w-full rounded-xl border border-tertiary-600 bg-secondary-700/80 px-4 py-3 text-sm text-accent-50 placeholder:text-quaternary-500 outline-none transition focus:border-tertiary-400 focus:ring-2 focus:ring-tertiary-500/50"
          />
        </div>
        <button
          type="submit"
          className="mt-2 rounded-xl bg-tertiary-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-accent-50 transition hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 active:bg-tertiary-600 sm:mt-0 touch-manipulation"
        >
          Add
        </button>
      </form>

      <div className="flex flex-1 flex-col rounded-2xl border border-tertiary-500/30 bg-secondary-700/60 p-4 shadow-inner shadow-primary-800/10">
        <header className="flex items-center justify-between pb-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-quaternary-400">Managers</h2>
          <span className="text-xs text-quaternary-500">{players.length} added</span>
        </header>
        {players.length ? (
          <ul className="grid flex-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
            {players.map((player) => (
              <li
                key={player.id}
                className="flex items-center justify-between rounded-xl border border-tertiary-500/30 bg-gradient-to-br from-secondary-700/70 to-secondary-700/70 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-accent-50">{player.name}</p>
                  <p className="text-xs text-quaternary-400">Ready for a new project</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemovePlayer(player.id)}
                  className="rounded-full border border-tertiary-600 px-3 py-1 text-xs uppercase tracking-widest text-quaternary-400 transition hover:border-warning-500 hover:text-warning-300 active:border-warning-500 active:text-warning-300 touch-manipulation"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-tertiary-600/80 bg-secondary-700/60 text-center text-sm text-quaternary-400">
            No managers added yet. Add yourself or your friends to start the draw.
          </div>
        )}
      </div>
    </section>
  );
}
