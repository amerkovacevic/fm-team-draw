import { useEffect, useMemo, useState } from 'react';

const LOCAL_STORAGE_KEY = 'fm-team-draw-history';
const generateId = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `history-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36)}`);

export default function useAssignmentHistory() {
  const [history, setHistory] = useState([]);
  const source = useMemo(() => 'browser', []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setHistory(parsed);
        } catch (error) {
          console.error('Failed to parse assignment history from local storage', error);
        }
      }
    }
  }, []);

  const saveLocally = (entry) => {
    if (typeof window === 'undefined') return;

    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 20);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const addToHistory = (entry) => {
    const payload = {
      id: entry.id ?? generateId(),
      ...entry,
      createdAt: entry.createdAt ?? new Date().toISOString(),
    };

    saveLocally(payload);
  };

  return { history, addToHistory, source };
}
