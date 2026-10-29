import React from 'react';

export default function WhatIfCard({ label, delta }) {
  const isPositive = delta > 0;
  const isNegative = delta < 0;
  const sign = delta > 0 ? '+' : '';

  return (
    <div className="what-if-card">
      <div className="what-if-content">
        <span className="what-if-tag">What-If Simulation</span>
        <div className="what-if-label">{label}</div>
        <p className="text-xs" style={{ color: 'var(--muted)', marginTop: '2px' }}>
          Estimated change based on peer patterns in the 5,000-student dataset.
        </p>
      </div>
      <div className={`delta-badge ${isPositive ? 'positive' : isNegative ? 'negative' : 'neutral'}`}>
        {sign}{delta.toFixed(2)} pts
      </div>

      <style>{`
        .what-if-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--surface);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.1rem 1.25rem;
          margin-bottom: 0.85rem;
          gap: 1rem;
          box-shadow: var(--shadow-sm);
          transition: transform 0.18s ease, border-color 0.18s ease;
        }
        .what-if-card:hover {
          transform: translateY(-1px);
          border-color: var(--accent-border);
        }
        .what-if-content {
          flex: 1;
        }
        .what-if-tag {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent);
          display: block;
        }
        .what-if-label {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text);
          margin-top: 2px;
        }
        .delta-badge {
          font-size: 0.92rem;
          font-weight: 700;
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-pill);
          white-space: nowrap;
          border: 1px solid transparent;
        }
        .delta-badge.positive {
          background: var(--good-soft);
          color: var(--good);
          border-color: rgba(61, 125, 86, 0.25);
        }
        .delta-badge.negative {
          background: var(--danger-soft);
          color: var(--danger);
          border-color: rgba(186, 67, 56, 0.25);
        }
        .delta-badge.neutral {
          background: var(--surface-translucent);
          color: var(--muted);
          border-color: var(--border);
        }
      `}</style>
    </div>
  );
}
