interface WaveDividerProps {
  from: string;
  to: string;
}

export default function WaveDivider({ from, to }: WaveDividerProps) {
  return (
    <div style={{ lineHeight: 0, background: from, marginTop: '-1px' }}>
      <svg
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '52px', display: 'block', overflow: 'hidden' }}
        aria-hidden="true"
      >
        <defs>
          <filter id="waveDepth" x="0%" y="-20%" width="100%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(0,0,0,0.22)" />
          </filter>
        </defs>
        <path
          d="M0,26 C480,52 960,0 1440,26 L1440,52 L0,52 Z"
          fill={to}
          filter="url(#waveDepth)"
        />
      </svg>
    </div>
  );
}
