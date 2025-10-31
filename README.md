# Football Manager Team Draw

A lightweight Football Manager companion that helps friends spin up new saves by randomly
assigning clubs based on country, league, or specific club preferences. Built with React,
Tailwind CSS, Vite, and Firebase.

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Firebase setup

Create a `.env.local` file in the project root and populate it with your Firebase credentials:

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

When Firebase credentials are present, assignment history is synced to Firestore under the
`teamAssignments` collection. Without Firebase, history is stored locally in the browser.

## Available scripts

- `npm run dev` – start the Vite development server
- `npm run build` – create a production build
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint

## Styling

Tailwind CSS powers the UI with a custom palette inspired by stadium floodlights and pitch
textures, matching the dark, neon-accented aesthetic from the pickup soccer page.
