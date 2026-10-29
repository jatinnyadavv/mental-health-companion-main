import React from 'react';
import ScoreArc from '../components/ScoreArc';
import TipCard from '../components/TipCard';
import WhatIfCard from '../components/WhatIfCard';

export default function Result({ result, onTalkItThrough, onViewHistory, onRetake }) {
  if (!result) return null;

  const { score, band, tips = [], what_if = [], disclaimer } = result;

  return (
    <div className="result-page animate-fade-in">
      <ScoreArc score={score} band={band} />

      {tips.length > 0 && (
        <div className="tips-section" style={{ marginTop: '1.75rem' }}>
          <h2 className="title-sm" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="section-pill-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </span>
            <span>Practical Habit Suggestions</span>
          </h2>
          {tips.map((tip, idx) => (
            <TipCard key={tip.id || idx} title={tip.title} body={tip.body} />
          ))}
        </div>
      )}

      {what_if.length > 0 && (
        <div className="what-if-section" style={{ marginTop: '1.75rem' }}>
          <h2 className="title-sm" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="section-pill-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </span>
            <span>What-If Habit Scenarios</span>
          </h2>
          {what_if.map((wi, idx) => (
            <WhatIfCard key={idx} label={wi.label} delta={wi.delta} />
          ))}
        </div>
      )}

      <div className="result-actions">
        <button
          id="talk-it-through-btn"
          className="btn btn-primary btn-full talk-btn"
          onClick={onTalkItThrough}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Talk it through with Saathi</span>
        </button>

        <div className="secondary-action-row">
          <button className="btn btn-secondary action-btn" onClick={onViewHistory}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>View History</span>
          </button>
          <button className="btn btn-secondary action-btn" onClick={onRetake}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            <span>Retake Check-in</span>
          </button>
        </div>
      </div>

      <div className="disclaimer-callout">
        <p className="text-xs">
          {disclaimer || "This is a habit-based estimate, not a diagnosis. Support companion, not a therapist. Not medical advice."}
        </p>
      </div>

      <style>{`
        .section-pill-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--accent-soft);
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .result-actions {
          max-width: 440px;
          margin: 2.25rem auto 0 auto;
        }
        .talk-btn {
          font-size: 1.02rem;
          font-weight: 600;
          padding: 0.85rem;
          gap: 0.55rem;
        }
        .secondary-action-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.85rem;
        }
        .action-btn {
          flex: 1;
          font-size: 0.88rem;
          gap: 0.4rem;
        }
        .disclaimer-callout {
          margin-top: 2rem;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-sm);
          background: var(--surface-translucent);
          border: 1px solid var(--border);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
