import React from 'react';

export default function SegmentedControl({ options, value, onChange, label, name }) {
  return (
    <div className="segmented-wrapper" role="radiogroup" aria-label={label || name}>
      {options.map((opt) => {
        const optValue = typeof opt === 'object' ? opt.value : opt;
        const optLabel = typeof opt === 'object' ? opt.label : opt;
        const isSelected = value === optValue;

        return (
          <button
            key={optValue}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={`segmented-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onChange(optValue)}
          >
            {optLabel}
          </button>
        );
      })}

      <style>{`
        .segmented-wrapper {
          display: flex;
          background: var(--surface-translucent);
          border: 1px solid var(--border);
          border-radius: var(--radius-pill);
          padding: 4px;
          gap: 4px;
          width: 100%;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.02);
        }
        .segmented-item {
          flex: 1;
          background: transparent;
          border: none;
          padding: 0.65rem 0.85rem;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--muted);
          border-radius: var(--radius-pill);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          user-select: none;
        }
        .segmented-item:hover:not(.selected) {
          color: var(--text);
          background: rgba(0, 0, 0, 0.03);
        }
        .segmented-item.selected {
          background: var(--surface-raised);
          color: var(--accent);
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </div>
  );
}
