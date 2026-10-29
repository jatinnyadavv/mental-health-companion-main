import React from 'react';

export default function TipCard({ title, body }) {
  return (
    <div className="tip-card card">
      <div className="tip-header">
        <div className="tip-icon-dot">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="tip-title">{title}</h3>
      </div>
      <p className="tip-body">{body}</p>

      <style>{`
        .tip-card {
          padding: 1.25rem 1.4rem;
          margin-bottom: 0.85rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-left: 3.5px solid var(--accent);
          border-radius: var(--radius-md);
        }
        .tip-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.4rem;
        }
        .tip-icon-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--accent-soft);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tip-title {
          font-size: 0.98rem;
          font-weight: 600;
          color: var(--text);
        }
        .tip-body {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-left: 28px;
        }
      `}</style>
    </div>
  );
}
