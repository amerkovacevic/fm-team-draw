import { teamDatabase, getLeaguesByCountry } from '../data/teams.js';

export default function FiltersPanel({ filters, onFiltersChange }) {
  const leagues = filters.country ? getLeaguesByCountry(filters.country) : [];

  const handleChange = (key) => (event) => {
    const value = event.target.value;
    const nextFilters = { ...filters, [key]: value };

    if (key === 'country') {
      nextFilters.league = '';
    }

    onFiltersChange(nextFilters);
  };

  return (
    <section className="space-y-4 rounded-3xl border border-slate-800 bg-gradient-to-br from-pitch/80 to-slate-900/70 p-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-emerald">Filters</p>
          <h2 className="font-display text-2xl text-sand">Dial in your scouting brief</h2>
        </div>
        <button
          type="button"
          className="text-xs uppercase tracking-widest text-gray-400 underline decoration-dotted decoration-emerald/50 hover:text-emerald"
          onClick={() => onFiltersChange({ country: '', league: '' })}
        >
          Reset
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Country</span>
          <select
            value={filters.country}
            onChange={handleChange('country')}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/40"
          >
            <option value="">All countries</option>
            {teamDatabase.map((entry) => (
              <option key={entry.country} value={entry.country}>
                {entry.flag} {entry.country}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">League</span>
          <select
            value={filters.league}
            onChange={handleChange('league')}
            disabled={!filters.country}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/40 disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-gray-500"
          >
            <option value="">All leagues</option>
            {leagues.map((league) => (
              <option key={league.name} value={league.name}>
                {league.name} · {league.level}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
