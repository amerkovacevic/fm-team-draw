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
    <section className="flex h-full flex-col gap-6 rounded-[28px] border border-primary-200 bg-white p-8">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary-600">Filters</p>
          <h2 className="font-display text-2xl leading-tight text-primary-900">Dial in your scouting brief</h2>
        </div>
        <button
          type="button"
          className="self-start rounded-full border border-primary-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary-600 transition hover:border-primary-400 hover:bg-accent-100 active:border-primary-400 active:bg-accent-100 touch-manipulation"
          onClick={handleReset}
        >
          Reset
        </button>
      </header>

      <div className="space-y-6">
        <label className="flex flex-col gap-3 text-sm">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-600">Country</span>
          <select
            value={filters.country}
            onChange={handleCountryChange}
            className="w-full rounded-2xl border border-primary-300 bg-white px-4 py-3.5 text-sm text-primary-900 outline-none transition focus:border-tertiary-400/70 focus:ring-2 focus:ring-tertiary-500/30"
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
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-600">Leagues</span>
          <div className="rounded-2xl border border-primary-200 bg-accent-100 px-5 py-4 shadow-inner">
            {!filters.country ? (
              <p className="text-xs leading-relaxed text-primary-500">Select a country to browse its leagues.</p>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2">
                {leagues.map((league) => {
                  const isChecked = selectedLeagues.includes(league.name);
                  return (
                    <li key={league.name}>
                      <label className="flex items-center gap-4 rounded-xl border border-transparent px-4 py-3 transition hover:border-primary-300 hover:bg-white">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleLeagueToggle(league.name)}
                          className="h-4 w-4 rounded border border-primary-300 bg-white text-tertiary-500 focus:ring-tertiary-500"
                        />
                        <span className="flex-1 text-primary-900">{league.name}</span>
                        {/*   <span className="text-[11px] uppercase tracking-[0.25em] text-primary-500">{league.level}</span> */}
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      <label className="flex items-start gap-4 rounded-2xl border border-primary-200 bg-white px-5 py-4 text-sm text-primary-700 transition hover:border-primary-300 hover:bg-accent-100 active:border-primary-300 active:bg-accent-100">
        <input
          type="checkbox"
          checked={Boolean(filters.sameLeague)}
          onChange={handleSameLeagueChange}
          className="mt-1 h-4 w-4 rounded border border-primary-300 bg-white text-tertiary-500 focus:ring-tertiary-500"
        />
        <span className="space-y-2">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-600">Keep managers in the same league</span>
          <span className="block text-sm leading-relaxed text-primary-700">
            When enabled, everyone will be assigned clubs from a single competition.
          </span>
        </span>
      </label>
    </section>
  );
}
