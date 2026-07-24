/**
 * Faint hand-drawn-style line art behind the FAQ list. Purely decorative,
 * non-interactive, and low-opacity so it never fights the text.
 */
export default function FaqBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden text-orange-500/[0.06]"
    >
      {/* Route shield, top right */}
      <svg
        className="absolute -right-6 top-10 h-56 w-56 rotate-6"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M50 6 C30 6 12 10 12 10 C12 40 14 70 50 94 C86 70 88 40 88 10 C88 10 70 6 50 6 Z" />
        <path d="M32 40 h36 M50 40 v28 M32 40 l-6 -10 M68 40 l6 -10" />
      </svg>

      {/* Flames, mid left */}
      <svg
        className="absolute left-2 top-1/3 h-72 w-72"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M30 85 C10 65 25 55 28 45 C33 60 40 52 38 40 C50 55 48 30 45 20 C60 35 70 55 66 72 C64 82 50 90 30 85 Z" />
        <path d="M50 80 C42 72 48 66 50 60 C55 68 58 62 57 55 C64 64 66 74 60 80 Z" />
      </svg>

      {/* Wheel / piston, bottom right */}
      <svg
        className="absolute -right-10 bottom-8 h-80 w-80"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="50" cy="50" r="34" />
        <circle cx="50" cy="50" r="12" />
        <path d="M50 16 v14 M50 70 v14 M16 50 h14 M70 50 h14 M26 26 l10 10 M64 64 l10 10 M74 26 l-10 10 M36 64 l-10 10" />
      </svg>
    </div>
  );
}
