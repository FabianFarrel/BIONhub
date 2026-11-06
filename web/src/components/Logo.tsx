// BIONhub logo mark (rounded red square with a play triangle + gold hub node).
// Rendered as inline SVG so it stays crisp and inherits sizing.
export default function Logo({ size = 40 }: { size?: number }) {
  const id = 'bionLogoRed';
  return (
    <svg width={size} height={size} viewBox="0 0 112 112" aria-label="BIONhub">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff1f2b" />
          <stop offset="1" stopColor="#b00710" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="112" height="112" rx="26" fill={`url(#${id})`} />
      <path d="M44 34 L80 56 L44 78 Z" fill="#fff" />
      <circle cx="90" cy="22" r="9" fill="#ffd65b" />
    </svg>
  );
}
