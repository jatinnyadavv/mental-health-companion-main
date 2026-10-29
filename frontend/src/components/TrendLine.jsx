import React from 'react';

export default function TrendLine({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="trend-empty text-center text-sm">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 0.5rem auto' }}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <div>No check-ins yet. Take your first check-in to start tracking!</div>
      </div>
    );
  }

  if (items.length === 1) {
    const single = items[0];
    return (
      <div className="trend-empty text-center text-sm">
        <div>First check-in recorded: <strong style={{ color: 'var(--accent)' }}>{single.score.toFixed(1)} / 10</strong> ({single.band}).</div>
        <div style={{ marginTop: '4px', color: 'var(--muted)', fontSize: '0.8rem' }}>
          Complete another check-in in a few days to view your trend chart.
        </div>
      </div>
    );
  }

  const width = 480;
  const height = 160;
  const padding = 28;

  const minScore = 0;
  const maxScore = 10;

  const points = items.map((it, idx) => {
    const x = padding + (idx / (items.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((it.score - minScore) / (maxScore - minScore)) * (height - 2 * padding);
    return { x, y, score: it.score, band: it.band, date: it.created_at };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
  }, '');

  // Closed area under the curve
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="trend-line-container">
      <svg viewBox={`0 0 ${width} ${height}`} className="trend-svg">
        <defs>
          <linearGradient id="trend-fill-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Reference Grid lines */}
        <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="var(--border-light)" strokeDasharray="4 4" />
        <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="var(--border-light)" strokeDasharray="4 4" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--border)" />

        {/* Labels */}
        <text x={8} y={padding + 4} fill="var(--muted)" fontSize="10" fontWeight="600">10</text>
        <text x={12} y={height / 2 + 4} fill="var(--muted)" fontSize="10" fontWeight="600">5</text>
        <text x={12} y={height - padding + 4} fill="var(--muted)" fontSize="10" fontWeight="600">0</text>

        {/* Shaded Area */}
        <path d={areaD} fill="url(#trend-fill-gradient)" />

        {/* Line Stroke */}
        <path d={pathD} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {points.map((pt, idx) => (
          <g key={idx}>
            <circle cx={pt.x} cy={pt.y} r="5" fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth="2.5" />
            <text x={pt.x} y={pt.y - 10} textAnchor="middle" fill="var(--text)" fontSize="11" fontWeight="700">
              {pt.score.toFixed(1)}
            </text>
          </g>
        ))}
      </svg>

      <style>{`
        .trend-line-container {
          width: 100%;
          background: var(--surface);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.25rem 0.85rem;
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow-sm);
        }
        .trend-svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .trend-empty {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
