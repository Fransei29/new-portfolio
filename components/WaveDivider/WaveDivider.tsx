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
        style={{ width: '100%', height: '52px', display: 'block' }}
        aria-hidden="true"
      >
        <path
          d="M0,26 C480,52 960,0 1440,26 L1440,52 L0,52 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
