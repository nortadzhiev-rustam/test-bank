export function TestlyLogo({ size = 96, showWordmark = false, name = 'Testly' }) {
  const gradId = 'testly-grad';
  const textGradId = 'testly-grad-text';

  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${name} logo`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C5CFF" />
          <stop offset="55%" stopColor="#5B7CFF" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="160" height="160" rx="38" fill={`url(#${gradId})`} />
      <path
        d="M80 28 C88 60 100 72 132 80 C100 88 88 100 80 132 C72 100 60 88 28 80 C60 72 72 60 80 28 Z"
        fill="#fff"
      />
      <path
        d="M122 30 C125 42 130 47 142 50 C130 53 125 58 122 70 C119 58 114 53 102 50 C114 47 119 42 122 30 Z"
        fill="#fff"
        fillOpacity={0.92}
      />
    </svg>
  );

  if (!showWordmark) return icon;

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.18 }}>
      {icon}
      <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
        <svg
          height={size * 0.42}
          viewBox="0 0 200 50"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={textGradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7C5CFF" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="40"
            fontFamily="-apple-system, system-ui, 'Segoe UI', sans-serif"
            fontSize="46"
            fontWeight="600"
            fill={`url(#${textGradId})`}
          >
            {name}
          </text>
        </svg>
        <span
          style={{
            fontFamily: '-apple-system, system-ui, "Segoe UI", sans-serif',
            fontSize: size * 0.13,
            fontWeight: 400,
            letterSpacing: size * 0.03,
            color: '#9AA1AD',
            marginTop: size * 0.04,
          }}
        >
          TEST GENERATOR
        </span>
      </span>
    </span>
  );
}
