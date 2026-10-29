import React from 'react';

export default function ScoreArc({ score, band }) {
  // Score is 0 - 10
  const normalized = Math.max(0, Math.min(10, score || 0));
  const percentage = normalized / 10;
  
  // Circumference for r=70 is 2 * PI * 70 = 439.82
  const radius = 70;
  const stroke = 9;
  const circumference = 2 * Math.PI * radius;
  const arcSpan = 0.72; // 72% circle arc
  const arcLength = circumference * arcSpan;
  const strokeDashoffset = arcLength * (1 - percentage);

  let bandColor = 'var(--good)';
  let bandBg = 'var(--good-soft)';
  let bandBorder = 'rgba(61, 125, 86, 0.25)';
  
  if (band === 'Moderate') {
    bandColor = 'var(--warn)';
    bandBg = 'var(--warn-soft)';
    bandBorder = 'rgba(186, 115, 41, 0.25)';
  } else if (band === 'Low') {
    bandColor = 'var(--danger)';
    bandBg = 'var(--danger-soft)';
    bandBorder = 'rgba(186, 67, 56, 0.25)';
  }

  return (
    <div className="score-arc-card card text-center">
      <div className="arc-wrapper">
        <svg viewBox="0 0 180 180" className="arc-svg">
          {/* Subtle glow filter */}
          <defs>
            <filter id="arc-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="var(--border-light)"
            strokeWidth={stroke}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            transform="rotate(140 90 90)"
          />

          {/* Active progress track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={bandColor}
            strokeWidth={stroke}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(140 90 90)"
            filter="url(#arc-glow)"
            style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>

        <div className="score-display">
          <span className="score-number">{normalized.toFixed(1)}</span>
          <span className="score-scale">out of 10</span>
        </div>
      </div>

      <div className="band-pill" style={{ backgroundColor: bandBg, color: bandColor, borderColor: bandBorder }}>
        <span className="band-dot" style={{ backgroundColor: bandColor }} />
        <span>{band} Wellbeing Signal</span>
      </div>

      <p className="text-sm" style={{ marginTop: '0.75rem', maxWidth: '380px' }}>
        Based on correlation patterns learned from 5,000 university students' daily lifestyle habits.
      </p>

      <style>{`
        .score-arc-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2.25rem 1.75rem 1.75rem 1.75rem;
          position: relative;
          overflow: hidden;
        }
        .arc-wrapper {
          position: relative;
          width: 180px;
          height: 180px;
          margin-bottom: 0.75rem;
        }
        .arc-svg {
          width: 100%;
          height: 100%;
        }
        .score-display {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 14px;
        }
        .score-number {
          font-size: 2.75rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--text);
        }
        .score-scale {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 4px;
        }
        .band-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.95rem;
          border-radius: var(--radius-pill);
          font-size: 0.88rem;
          font-weight: 600;
          border: 1px solid transparent;
          margin-top: 0.25rem;
        }
        .band-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
