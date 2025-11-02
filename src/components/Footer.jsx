export default function Footer() {
  return (
    <footer className="w-full border-t border-tertiary-500/30 bg-primary-800/80 py-4 text-center text-xs text-quaternary-500">
      <p>&copy; {new Date().getFullYear()} Amer Kovacevic All rights reserved.</p>
    </footer>
  );
}

