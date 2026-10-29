import React from 'react';

export default function ProgressDots({ total, current }) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="progress-container" aria-label={`Step ${current + 1} of ${total}`}>
      <div className="progress-dots">
        {Array.from({ length: total }).map((_, idx) => {
          const isDone = idx < current;
          const isCurrent = idx === current;
          return (
            <span
              key={idx}
              className={`dot ${isDone ? 'done' : ''} ${isCurrent ? 'active' : ''}`}
            />
          );
        })}
      </div>
      <div className="progress-indicator-pill">
        <span className="step-counter">Question {current + 1} of {total}</span>
        <span className="step-percent">{percent}%</span>
      </div>

      <style>{`
        .progress-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding: 0 0.25rem;
        }
        .progress-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .dot {
          width: 7px;
          height: 7px;
          border-radius: var(--radius-pill);
          background: var(--border);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dot.done {
          background: var(--accent);
          opacity: 0.75;
        }
        .dot.active {
          width: 22px;
          height: 7px;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent-glow);
          opacity: 1;
        }
        .progress-indicator-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--surface-translucent);
          border: 1px solid var(--border);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-pill);
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .step-counter {
          font-weight: 500;
        }
        .step-percent {
          font-weight: 700;
          color: var(--accent);
        }
      `}</style>
    </div>
  );
}
