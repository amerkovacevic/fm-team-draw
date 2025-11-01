import { useState } from 'react';

export default function PlayerForm({ onAddPlayer }) {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = playerName.trim();
    if (!trimmed) return;
    onAddPlayer(trimmed);
    setPlayerName('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-850/70 p-6 shadow-lg shadow-black/20 sm:flex-row"
    >
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
        className="mt-2 rounded-xl bg-azure px-6 py-3 text-sm font-semibold uppercase tracking-widest text-pitch transition hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 sm:mt-auto"
      >
        Add
      </button>
    </form>
  );
}
