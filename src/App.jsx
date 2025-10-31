import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import PlayerForm from './components/PlayerForm.jsx';
import PlayerList from './components/PlayerList.jsx';
import FiltersPanel from './components/FiltersPanel.jsx';
import AssignmentResults from './components/AssignmentResults.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';
import useAssignmentHistory from './hooks/useAssignmentHistory.js';
import { flattenTeams } from './data/teams.js';

const buildFiltersSummary = ({ country, league, team }) => {
  const segments = [];
  if (country) segments.push(country);
  if (league) segments.push(league);
  if (team) segments.push(team);
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
  const [filters, setFilters] = useState({ country: '', league: '', team: '' });
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { history, addToHistory, source } = useAssignmentHistory();

  const availableTeams = useMemo(() => {
    const teams = flattenTeams();

    return teams.filter((team) => {
      if (filters.team && team.name !== filters.team) return false;
      if (filters.league && team.league !== filters.league) return false;
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

    const pool = [...availableTeams];
    const results = participants.map((player) => {
      const index = Math.floor(Math.random() * pool.length);
      const [team] = pool.splice(index, 1);
      return { ...team, player: player.name };
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

        <footer className="mt-8 rounded-3xl border border-slate-900 bg-slate-900/40 p-6 text-center text-xs text-gray-500">
          Built with love for Football Manager saves. Configure Firebase credentials in a
          <code className="mx-1 rounded bg-slate-800 px-1 py-0.5 text-[0.7rem] text-gray-300">
            .env.local
          </code>
          file to sync your draws across devices.
        </footer>
      </div>
    </div>
  );
}
