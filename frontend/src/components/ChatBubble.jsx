import React from 'react';

export default function ChatBubble({ role, content, isCrisis }) {
  const isUser = role === 'user';

  return (
    <div className={`chat-bubble-row ${isUser ? 'user-row' : 'assistant-row'}`}>
      {!isUser && (
        <div className="avatar assistant-avatar" aria-hidden="true" title="Saathi">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      )}
      <div
        className={`chat-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'} ${isCrisis ? 'crisis-bubble' : ''}`}
        aria-live={isUser ? 'off' : 'polite'}
      >
        <div className="bubble-text">{content}</div>
      </div>

      <style>{`
        .chat-bubble-row {
          display: flex;
          align-items: flex-end;
          gap: 0.6rem;
          margin-bottom: 0.95rem;
          animation: bubbleFade 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes bubbleFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .user-row {
          justify-content: flex-end;
        }
        .assistant-row {
          justify-content: flex-start;
        }
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-bottom: 2px;
        }
        .assistant-avatar {
          background: var(--accent-soft);
          color: var(--accent);
          border: 1px solid var(--accent-border);
          box-shadow: 0 2px 6px var(--accent-glow);
        }
        .chat-bubble {
          max-width: 82%;
          padding: 0.85rem 1.15rem;
          border-radius: 20px;
          font-size: 0.93rem;
          line-height: 1.55;
          word-break: break-word;
        }
        .user-bubble {
          background: var(--accent);
          color: #FFFFFF;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 12px var(--accent-glow);
        }
        .assistant-bubble {
          background: var(--surface);
          color: var(--text);
          border: 1px solid var(--border);
          border-bottom-left-radius: 4px;
          box-shadow: var(--shadow-sm);
        }
        .crisis-bubble {
          border-color: var(--danger);
          background: var(--danger-soft);
          color: var(--text);
          box-shadow: 0 2px 10px rgba(186, 67, 56, 0.15);
        }
      `}</style>
    </div>
  );
}
