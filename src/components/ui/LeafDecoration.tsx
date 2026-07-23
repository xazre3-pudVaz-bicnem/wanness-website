/** 植物の線画装飾（ミモザの枝をイメージした細い線画） */
export default function LeafDecoration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={`leaf-draw ${className ?? ""}`}
      aria-hidden="true"
    >
      <path
        d="M20 110 C 40 80, 50 60, 60 20 M60 20 C 62 34, 68 40, 78 42 M60 34 C 50 36, 46 32, 44 24 M64 48 C 74 50, 80 46, 84 38 M56 52 C 46 54, 40 50, 38 42 M68 64 C 78 66, 84 62, 88 54 M52 70 C 42 72, 36 68, 34 60 M72 82 C 82 84, 88 80, 92 72 M46 88 C 36 90, 30 86, 28 78"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="80" cy="30" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="88" cy="46" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="92" cy="64" r="2.5" fill="currentColor" opacity="0.35" />
    </svg>
  );
}
