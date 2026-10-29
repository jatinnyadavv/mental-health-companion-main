import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from '../components/ChatBubble';
import TypingDots from '../components/TypingDots';
import { api } from '../api';

const CONVERSATION_STARTERS = [
  "I'm feeling really stressed about upcoming exams.",
  "I can't seem to sleep well lately.",
  "I've been scrolling endlessly and feel drained.",
  "I feel a bit lonely and just wanted to share."
];

export default function Chat({ onOpenHelpline, initialContextMessage }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: initialContextMessage || "Hello, I'm Saathi. I'm here to listen without judgment. How are you feeling today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [remainingCalls, setRemainingCalls] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [hasCrisis, setHasCrisis] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    setErrorText(null);
    const updatedMessages = [...messages, { role: 'user', content: text }];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await api.chat(updatedMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: res.reply, isCrisis: res.crisis }]);
      if (res.remaining_calls !== undefined) {
        setRemainingCalls(res.remaining_calls);
      }
      if (res.crisis) {
        setHasCrisis(true);
        if (onOpenHelpline) onOpenHelpline();
      }
    } catch (err) {
      setErrorText(err.message || 'Trouble connecting to Saathi. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page animate-fade-in">
      <div className="chat-header">
        <div className="header-status-group">
          <div className="saathi-status">
            <span className="online-indicator-dot" />
            <span className="saathi-name">Saathi Companion</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--muted)', marginTop: '2px' }}>
            Empathetic listener · Not medical advice
          </p>
        </div>
        {remainingCalls !== null && (
          <div className="budget-tag" title="Gemini API demo call budget">
            <span className="budget-number">{remainingCalls}</span> calls left
          </div>
        )}
      </div>

      {hasCrisis && (
        <div className="crisis-alert-banner">
          <span>Immediate help is available: Call Tele-MANAS at <strong>14416</strong> or <strong>112</strong>.</span>
          <button className="banner-call-btn" onClick={onOpenHelpline}>
            Helplines
          </button>
        </div>
      )}

      <div className="messages-container">
        {messages.map((m, idx) => (
          <ChatBubble
            key={idx}
            role={m.role}
            content={m.content}
            isCrisis={m.isCrisis}
          />
        ))}
        {isTyping && <TypingDots />}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="starters-tray">
          <span className="starters-caption text-xs">
            Tap a reflection prompt to start:
          </span>
          <div className="starters-scroll">
            {CONVERSATION_STARTERS.map((st, i) => (
              <button
                key={i}
                type="button"
                className="starter-chip"
                onClick={() => handleSendMessage(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      )}

      {errorText && (
        <div className="error-toast text-sm">
          {errorText}
        </div>
      )}

      <div className="chat-input-bar">
        <textarea
          id="chat-textarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type whatever is on your mind... (Enter to send)"
          rows="1"
          maxLength={2000}
          className="chat-textarea"
        />
        <button
          id="send-chat-btn"
          className="btn btn-primary send-btn"
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim() || isTyping}
          aria-label="Send message"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>

      <style>{`
        .chat-page {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 190px);
          min-height: 520px;
        }
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 0.85rem;
        }
        .saathi-status {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .saathi-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text);
        }
        .online-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--good);
          box-shadow: 0 0 8px var(--good);
        }
        .budget-tag {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-pill);
        }
        .budget-number {
          font-weight: 700;
          color: var(--accent);
        }
        .crisis-alert-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--danger-soft);
          border: 1px solid rgba(186, 67, 56, 0.3);
          color: var(--danger);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          margin-bottom: 0.85rem;
          gap: 0.5rem;
        }
        .banner-call-btn {
          background: var(--danger);
          color: #FFFFFF;
          border: none;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-pill);
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.15s ease;
        }
        .banner-call-btn:hover {
          opacity: 0.9;
        }
        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem 0.35rem;
          display: flex;
          flex-direction: column;
        }
        .starters-tray {
          margin-top: 0.5rem;
          margin-bottom: 0.85rem;
        }
        .starters-caption {
          color: var(--muted);
          display: block;
          margin-bottom: 0.45rem;
          font-weight: 500;
        }
        .starters-scroll {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .starter-chip {
          background: var(--surface);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 0.82rem;
          font-family: inherit;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-pill);
          cursor: pointer;
          text-align: left;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--shadow-sm);
        }
        .starter-chip:hover {
          background: var(--accent-soft);
          border-color: var(--accent-border);
          color: var(--accent);
          transform: translateY(-1px);
        }
        .error-toast {
          background: var(--danger-soft);
          color: var(--danger);
          padding: 0.6rem 0.85rem;
          border-radius: var(--radius-sm);
          margin-bottom: 0.5rem;
        }
        .chat-input-bar {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--surface);
          backdrop-filter: blur(16px);
          border: 1px solid var(--border);
          border-radius: var(--radius-pill);
          padding: 0.35rem 0.45rem 0.35rem 1.15rem;
          box-shadow: var(--shadow-md);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .chat-input-bar:focus-within {
          border-color: var(--accent);
          box-shadow: 0 4px 18px var(--accent-glow);
        }
        .chat-textarea {
          flex: 1;
          border: none;
          background: transparent;
          font-family: inherit;
          font-size: 0.94rem;
          color: var(--text);
          resize: none;
          outline: none;
          line-height: 1.45;
          max-height: 110px;
        }
        .chat-textarea::placeholder {
          color: var(--muted);
        }
        .send-btn {
          width: 40px;
          height: 40px;
          min-height: 40px;
          padding: 0;
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
