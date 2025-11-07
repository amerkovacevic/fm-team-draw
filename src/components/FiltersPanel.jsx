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
    <section className="flex h-full flex-col gap-6 rounded-[28px] border border-tertiary-500/30 bg-gradient-to-br from-secondary-700/85 via-secondary-700 to-primary-800/80 p-8">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.35em] text-tertiary-400/80">Filters</p>
          <h2 className="font-display text-2xl leading-tight text-accent-50">Dial in your scouting brief</h2>
        </div>
        <button
          type="button"
          className="self-start rounded-full border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-tertiary-400 transition hover:border-tertiary-500/50 hover:bg-tertiary-500/10 active:border-tertiary-500/50 active:bg-tertiary-500/10 touch-manipulation"
          onClick={handleReset}
        >
          Reset
        </button>
      </header>

      <div className="space-y-6">
        <label className="flex flex-col gap-3 text-sm">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-quaternary-400">Country</span>
          <select
            value={filters.country}
            onChange={handleCountryChange}
            className="w-full rounded-2xl border border-tertiary-600/70 bg-secondary-700/70 px-4 py-3.5 text-sm text-accent-50 outline-none transition focus:border-tertiary-400/70 focus:ring-2 focus:ring-tertiary-500/30"
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
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-quaternary-400">Leagues</span>
          <div className="rounded-2xl border border-tertiary-600/70 bg-secondary-700/70 px-5 py-4 shadow-inner shadow-primary-800/10">
            {!filters.country ? (
              <p className="text-xs leading-relaxed text-quaternary-500">Select a country to browse its leagues.</p>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2">
                {leagues.map((league) => {
                  const isChecked = selectedLeagues.includes(league.name);
                  return (
                    <li key={league.name}>
                      <label className="flex items-center gap-4 rounded-xl border border-transparent px-4 py-3 transition hover:border-tertiary-400/30 hover:bg-secondary-600/50">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleLeagueToggle(league.name)}
                          className="h-4 w-4 rounded border border-tertiary-600 bg-secondary-700 text-tertiary-500 focus:ring-tertiary-500"
                        />
                        <span className="flex-1 text-accent-50">{league.name}</span>
                        {/*   <span className="text-[11px] uppercase tracking-[0.25em] text-quaternary-500">{league.level}</span> */}
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      <label className="flex items-start gap-4 rounded-2xl border border-tertiary-500/30 bg-secondary-700/70 px-5 py-4 text-sm text-quaternary-200 transition hover:border-tertiary-400/40 hover:bg-secondary-700/90 active:border-tertiary-400/40 active:bg-secondary-700/90">
        <input
          type="checkbox"
          checked={Boolean(filters.sameLeague)}
          onChange={handleSameLeagueChange}
          className="mt-1 h-4 w-4 rounded border border-tertiary-600 bg-secondary-700 text-tertiary-500 focus:ring-tertiary-500"
        />
        <span className="space-y-2">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-quaternary-400">Keep managers in the same league</span>
          <span className="block text-sm leading-relaxed text-quaternary-300">
            When enabled, everyone will be assigned clubs from a single competition.
          </span>
        </span>
      </label>
    </section>
  );
}
