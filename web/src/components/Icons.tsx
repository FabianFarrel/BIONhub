// Lightweight inline SVG icon set (stroke-based, inherits currentColor).
// Keeps the UI emoji-free and consistent with the IDLIX-style navbar.

type P = { size?: number; className?: string; style?: React.CSSProperties };

const base = (size: number): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconHome = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
  </svg>
);

export const IconFilm = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
  </svg>
);

export const IconTv = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <rect x="2.5" y="6.5" width="19" height="12" rx="2" />
    <path d="m8 3 4 3.5L16 3" />
  </svg>
);

export const IconMusic = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M9 18V5l11-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="17" cy="16" r="3" />
  </svg>
);

export const IconDots = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <circle cx="5" cy="12" r="1.4" />
    <circle cx="12" cy="12" r="1.4" />
    <circle cx="19" cy="12" r="1.4" />
  </svg>
);

export const IconHeart = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5C19 15.5 12 20 12 20Z" />
  </svg>
);

export const IconSearch = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);

export const IconUser = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
  </svg>
);

export const IconChevron = ({ size = 16, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconSettings = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" />
  </svg>
);

export const IconLogout = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
    <path d="M10 17 5 12l5-5M5 12h12" />
  </svg>
);

export const IconLogin = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" />
    <path d="m14 17 5-5-5-5M19 12H7" />
  </svg>
);

export const IconMoon = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

export const IconSun = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const IconPlay = ({ size = 18, className, style }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const IconSync = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M4 10a8 8 0 0 1 13.5-4L20 8" />
    <path d="M20 4v4h-4" />
    <path d="M20 14a8 8 0 0 1-13.5 4L4 16" />
    <path d="M4 20v-4h4" />
  </svg>
);

export const IconHeadphones = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="14" width="4" height="6" rx="1.5" />
    <rect x="17" y="14" width="4" height="6" rx="1.5" />
  </svg>
);

export const IconStar = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M12 3.5 14.6 9l6 .5-4.6 4 1.4 5.9L12 16.8 6.6 19.4 8 13.5 3.4 9.5l6-.5L12 3.5Z" />
  </svg>
);

export const IconLock = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </svg>
);

export const IconMail = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const IconDevices = ({ size = 18, className, style }: P) => (
  <svg {...base(size)} className={className} style={style}>
    <rect x="2.5" y="5" width="13" height="10" rx="1.6" />
    <path d="M6 19h7" />
    <rect x="17" y="9" width="5" height="11" rx="1.4" />
  </svg>
);
