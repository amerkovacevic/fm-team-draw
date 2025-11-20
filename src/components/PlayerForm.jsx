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
    <section className="flex h-full flex-col gap-6 rounded-2xl border border-primary-200 bg-white p-6 shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="player" className="text-xs font-semibold uppercase tracking-wide text-primary-600">
            Add player
          </label>
          <input
            id="player"
            type="text"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="e.g. Alex Ferguson"
            className="w-full rounded-xl border border-primary-300 bg-white px-4 py-3 text-sm text-primary-900 placeholder:text-primary-400 outline-none transition focus:border-tertiary-400 focus:ring-2 focus:ring-tertiary-500/50"
          />
        </div>
        <button
          type="submit"
          className="mt-2 rounded-xl bg-tertiary-100 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-tertiary-700 transition hover:-translate-y-0.5 hover:bg-tertiary-200 hover:shadow-glow active:translate-y-0 sm:mt-0 touch-manipulation"
        >
          Add
        </button>
      </form>

      <div className="flex flex-1 flex-col rounded-2xl border border-primary-200 bg-accent-100 p-4 shadow-inner">
        <header className="flex items-center justify-between pb-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-600">Managers</h2>
          <span className="text-xs text-primary-500">{players.length} added</span>
        </header>
        {players.length ? (
          <ul className="grid flex-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
            {players.map((player) => (
              <li
                key={player.id}
                className="flex items-center justify-between rounded-xl border border-primary-200 bg-white px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-primary-900">{player.name}</p>
                  <p className="text-xs text-primary-600">Ready for a new project</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemovePlayer(player.id)}
                  className="rounded-full border border-primary-300 px-3 py-1 text-xs uppercase tracking-widest text-primary-600 transition hover:border-warning-500 hover:text-warning-700 active:border-warning-500 active:text-warning-700 touch-manipulation"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-primary-300 bg-white text-center text-sm text-primary-600">
            No managers added yet. Add yourself or your friends to start the draw.
          </div>
        )}
      </div>
    </section>
  );
}
