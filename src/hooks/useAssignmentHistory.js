import { useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db, firebaseEnabled } from '../lib/firebase.js';

const LOCAL_STORAGE_KEY = 'fm-team-draw-history';

const buildCollectionRef = () => (db ? collection(db, 'teamAssignments') : null);

export default function useAssignmentHistory() {
  const [history, setHistory] = useState([]);
  const source = useMemo(() => (firebaseEnabled ? 'cloud' : 'local'), []);

  useEffect(() => {
    if (firebaseEnabled) {
      const historyQuery = query(buildCollectionRef(), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(historyQuery, (snapshot) => {
        const payload = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setHistory(payload);
      });

      return () => unsubscribe();
    }

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

  const addToHistory = async (entry) => {
    const payload = {
      ...entry,
      createdAt: entry.createdAt ?? new Date().toISOString(),
    };

    if (firebaseEnabled) {
      try {
        await addDoc(buildCollectionRef(), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.error('Unable to save assignment to Firestore. Falling back to local storage.', error);
        saveLocally(payload);
      }
    } else {
      saveLocally(payload);
    }
  };

  return { history, addToHistory, source };
}
