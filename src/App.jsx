import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import PlayerForm from './components/PlayerForm.jsx';
import PlayerList from './components/PlayerList.jsx';
import FiltersPanel from './components/FiltersPanel.jsx';
import AssignmentResults from './components/AssignmentResults.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';
import useAssignmentHistory from './hooks/useAssignmentHistory.js';
import { flattenTeams } from './data/teams.js';

const buildFiltersSummary = ({ country, leagues, sameLeague }) => {
  const segments = [];
  if (country) segments.push(country);
  if (leagues?.length) segments.push(leagues.join(', '));
  if (sameLeague) segments.push('Same league draw');
  return segments.length ? segments.join(' · ') : 'No filters';
};

const flattenPlayers = (players) =>
  players.map((player) => (typeof player === 'string' ? player : player.name)).filter(Boolean);

const generatePlayerId = () => {
  const nativeCrypto = typeof crypto !== 'undefined' ? crypto : undefined;
  return nativeCrypto?.randomUUID()
    ?? `player-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36)}`;
};

export default function App() {
  const [players, setPlayers] = useState([]);
  const [filters, setFilters] = useState({ country: '', leagues: [], sameLeague: false });
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { history, addToHistory, source } = useAssignmentHistory();

  const availableTeams = useMemo(() => {
    const teams = flattenTeams();

    return teams.filter((team) => {
      if (filters.leagues?.length && !filters.leagues.includes(team.league)) return false;
      if (filters.country && team.country !== filters.country) return false;
      return true;
    });
  }, [filters]);

  const addPlayer = (name) => {
    setPlayers((prev) => {
      if (prev.some((player) => player.name.toLowerCase() === name.toLowerCase())) {
        setError('That manager is already in the list.');
        setTimeout(() => setError(''), 2500);
        return prev;
      }

      return [...prev, { id: generatePlayerId(), name }];
    });
  };

  const removePlayer = (id) => {
    setPlayers((prev) => prev.filter((player) => player.id !== id));
  };

  const randomizeTeams = () => {
    setError('');

    const participants = players.length ? players : [{ id: 'solo', name: 'Manager' }];

    if (!availableTeams.length) {
      setError('No clubs match the current filters. Try broadening your search.');
      return;
    }

    if (availableTeams.length < participants.length) {
      setError('Not enough clubs for the number of managers. Add more leagues or remove players.');
      return;
    }

    setLoading(true);

    let pool;

    if (filters.sameLeague) {
      const leagueCandidates = filters.leagues?.length
        ? filters.leagues
        : Array.from(new Set(availableTeams.map((team) => team.league)));

      const viableLeagues = leagueCandidates
        .map((leagueName) => ({
          name: leagueName,
          teams: availableTeams.filter((team) => team.league === leagueName),
        }))
        .filter((entry) => entry.teams.length >= participants.length);

      if (!viableLeagues.length) {
        setError(
          'No league has enough clubs for the number of managers. Choose different leagues or disable the single-league option.'
        );
        setLoading(false);
        return;
      }

      const selectedLeague = viableLeagues[Math.floor(Math.random() * viableLeagues.length)];
      pool = [...selectedLeague.teams];
    } else {
      pool = [...availableTeams];
    }

    const results = participants.map((player) => {
      const index = Math.floor(Math.random() * pool.length);
      const [team] = pool.splice(index, 1);
      return { ...team, team: team.name, player: player.name };
    });

    setAssignments(results);

    const payload = {
      assignments: results,
      players: flattenPlayers(participants),
      context: {
        filters,
        filtersSummary: buildFiltersSummary(filters),
      },
    };

    addToHistory(payload);

    setTimeout(() => setLoading(false), 350);
  };

  const canRandomize = useMemo(() => {
    const hasPlayers = players.length > 0;
    return hasPlayers || availableTeams.length > 0;
  }, [players.length, availableTeams.length]);

  return (
    <div className="min-h-screen bg-midnight pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pt-12">
        <Header />

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <PlayerForm onAddPlayer={addPlayer} />
            <PlayerList players={players} onRemove={removePlayer} />
          </div>
          <FiltersPanel filters={filters} onFiltersChange={setFilters} />
        </section>

        <AssignmentResults
          assignments={assignments}
          onRandomize={randomizeTeams}
          loading={loading}
          canRandomize={canRandomize}
          error={error}
        />

        <HistoryPanel history={history} source={source} />

        
      <footer className="border-t border-slate-800 bg-slate-900/80 py-4 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Amer Kovacevic All rights reserved.</p>
      </footer>
      </div>
    </div>
  );
}
