import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isConfigValid = Object.values(firebaseConfig).every((value) => value);

let firebaseApp = null;
let firestore = null;

if (isConfigValid) {
  firebaseApp = initializeApp(firebaseConfig);
  firestore = getFirestore(firebaseApp);
} else if (import.meta.env.DEV) {
  console.warn(
    'Firebase configuration is incomplete. Populate VITE_FIREBASE_* environment variables to enable cloud syncing.'
  );
}

export const app = firebaseApp;
export const db = firestore;
export const firebaseEnabled = Boolean(firestore);
