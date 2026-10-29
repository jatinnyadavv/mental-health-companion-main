import React from 'react';

export default function Welcome({ onStartCheckIn, onOpenChat, onOpenHistory }) {
  return (
    <div className="welcome-page animate-fade-in">
      <div className="welcome-hero text-center">
        {/* Serene Breathing Halo */}
        <div className="halo-wrapper">
          <div className="halo-circle outer" />
          <div className="halo-circle middle" />
          <div className="halo-circle inner">
            <svg viewBox="0 0 24 24" className="hero-lotus-icon">
              <path d="M12 3c-1.5 3-4.5 6-7 7 2.5 1 5.5 4 7 7 1.5-3 4.5-6 7-7-2.5-1-5.5-4-7-7z" />
            </svg>
          </div>
        </div>

        <div className="welcome-badge">
          <span className="pulse-dot" />
          <span>Mindful Student Companion</span>
        </div>

        <h1 className="title-xl" style={{ marginTop: '0.85rem', marginBottom: '0.65rem' }}>
          Mansik Santulan
        </h1>
        <p className="subtitle" style={{ maxWidth: '440px', margin: '0 auto 1.8rem auto' }}>
          A calm, private space to reflect on your daily habits, explore wellbeing insights, and talk through whatever is on your mind.
        </p>

        <div className="hero-cta-group">
          <button
            id="start-checkin-btn"
            className="btn btn-primary btn-full hero-primary-btn"
            onClick={onStartCheckIn}
          >
            <span>Start Wellbeing Check-in</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          <div className="quick-action-row">
            <button className="btn btn-secondary quick-btn" onClick={onOpenChat}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Talk with Saathi</span>
            </button>
            <button className="btn btn-secondary quick-btn" onClick={onOpenHistory}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Past Trends</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Pillars */}
      <div className="card feature-box" style={{ marginTop: '2.25rem' }}>
        <h2 className="title-sm" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>How this companion works</span>
        </h2>
        <div className="feature-grid">
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div>
              <strong className="feature-title">2-Min Habit Check-in</strong>
              <p className="text-xs">Quick questions on sleep, screen time, movement, and stress.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <div>
              <strong className="feature-title">Habit-Based Signal</strong>
              <p className="text-xs">Machine-learning wellbeing score from 5,000 university students.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              </svg>
            </div>
            <div>
              <strong className="feature-title">What-If Scenarios</strong>
              <p className="text-xs">Simulate in real-time how +1h sleep or less screen time shifts your score.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <div>
              <strong className="feature-title">Supportive AI Saathi</strong>
              <p className="text-xs">Talk through thoughts with a gentle AI companion powered by Gemini.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Guarantee Pill */}
      <div className="privacy-pill-box text-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span><strong>100% Anonymous & Private</strong> — No login or profile. Wipe all data in one click.</span>
      </div>

      <style>{`
        .halo-wrapper {
          position: relative;
          width: 72px;
          height: 72px;
          margin: 0.5rem auto 1.25rem auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .halo-circle {
          position: absolute;
          border-radius: 50%;
        }
        .halo-circle.outer {
          width: 72px;
          height: 72px;
          background: var(--accent-soft);
          animation: breathPulse 4s ease-in-out infinite;
        }
        .halo-circle.middle {
          width: 54px;
          height: 54px;
          background: rgba(73, 117, 92, 0.16);
          animation: breathPulse 4s ease-in-out infinite 0.6s;
        }
        .halo-circle.inner {
          width: 40px;
          height: 40px;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px var(--accent-glow);
        }
        .hero-lotus-icon {
          width: 22px;
          height: 22px;
          fill: #FFFFFF;
        }
        @keyframes breathPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
        .welcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--accent);
          background: var(--accent-soft);
          border: 1px solid var(--accent-border);
          padding: 0.35rem 0.9rem;
          border-radius: var(--radius-pill);
          letter-spacing: 0.02em;
        }
        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 6px var(--accent);
        }
        .hero-cta-group {
          max-width: 420px;
          margin: 0 auto;
        }
        .hero-primary-btn {
          font-size: 1.02rem;
          font-weight: 600;
          padding: 0.9rem 1.4rem;
        }
        .quick-action-row {
          margin-top: 0.85rem;
          display: flex;
          gap: 0.75rem;
        }
        .quick-btn {
          flex: 1;
          font-size: 0.88rem;
          gap: 0.4rem;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.1rem;
        }
        @media (max-width: 480px) {
          .feature-grid {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }
        }
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
        }
        .feature-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: var(--accent-soft);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .feature-title {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text);
          display: block;
          margin-bottom: 0.2rem;
        }
        .privacy-pill-box {
          margin-top: 1.5rem;
          font-size: 0.8rem;
          color: var(--muted);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
