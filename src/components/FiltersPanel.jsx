import { teamDatabase, getLeaguesByCountry } from '../data/teams.js';

export default function FiltersPanel({ filters, onFiltersChange }) {
  const leagues = filters.country ? getLeaguesByCountry(filters.country) : [];
  const selectedLeagues = filters.leagues ?? [];

  const handleCountryChange = (event) => {
    const value = event.target.value;
    const nextFilters = {
      ...filters,
      country: value,
      leagues: [],
    };

    onFiltersChange(nextFilters);
  };

  const handleLeagueToggle = (leagueName) => (event) => {
    const { checked } = event.target;
    const nextLeagues = checked
      ? [...selectedLeagues, leagueName]
      : selectedLeagues.filter((name) => name !== leagueName);

    onFiltersChange({ ...filters, leagues: nextLeagues });
  };

  const handleSameLeagueChange = (event) => {
    onFiltersChange({ ...filters, sameLeague: event.target.checked });
  };

  const handleReset = () => {
    onFiltersChange({ country: '', leagues: [], sameLeague: false });
  };

  return (
    <section className="flex flex-col gap-6 rounded-[28px] border border-slate-800/80 bg-gradient-to-br from-pitch/85 via-slate-900 to-slate-950/80 p-8 shadow-[0_18px_45px_-30px_rgba(16,185,129,0.55)]">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.35em] text-emerald/80">Filters</p>
          <h2 className="font-display text-2xl leading-tight text-sand">Dial in your scouting brief</h2>
        </div>
        <button
          type="button"
          className="self-start rounded-full border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald transition hover:border-emerald/50 hover:bg-emerald/10"
          onClick={handleReset}
        >
          Reset
        </button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,240px)_1fr]">
        <label className="flex flex-col gap-3 text-sm">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Country</span>
          <select
            value={filters.country}
            onChange={handleCountryChange}
            className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/70 px-4 py-3.5 text-sm text-gray-100 outline-none transition focus:border-emerald/70 focus:ring-2 focus:ring-emerald/30"
          >
            <option value="">All countries</option>
            {teamDatabase.map((entry) => (
              <option key={entry.country} value={entry.country}>
                {entry.flag} {entry.country}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Leagues</span>
          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-inner shadow-black/10">
            {!filters.country ? (
              <p className="text-xs leading-relaxed text-gray-500">Select a country to browse its leagues.</p>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {leagues.map((league) => {
                  const isChecked = selectedLeagues.includes(league.name);
                  return (
                    <li key={league.name}>
                      <label className="flex items-center gap-4 rounded-xl border border-transparent px-3 py-2 transition hover:border-emerald/30 hover:bg-slate-800/50">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleLeagueToggle(league.name)}
                          className="h-4 w-4 rounded border border-slate-600 bg-slate-900 text-emerald focus:ring-emerald"
                        />
                        <span className="flex-1 text-gray-100">{league.name}</span>
                        <span className="text-[11px] uppercase tracking-[0.25em] text-gray-500">{league.level}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      <label className="flex items-start gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 px-5 py-4 text-sm text-gray-200 transition hover:border-emerald/40 hover:bg-slate-900/90">
        <input
          type="checkbox"
          checked={Boolean(filters.sameLeague)}
          onChange={handleSameLeagueChange}
          className="mt-1 h-4 w-4 rounded border border-slate-600 bg-slate-900 text-emerald focus:ring-emerald"
        />
        <span className="space-y-2">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Keep managers in the same league</span>
          <span className="block text-sm leading-relaxed text-gray-300">
            When enabled, everyone will be assigned clubs from a single competition.
          </span>
        </span>
      </label>
    </section>
  );
}
