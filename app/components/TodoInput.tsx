'use client';

import { useState } from 'react';

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export default function TodoInput({ value, onChange, onAdd }: TodoInputProps) {
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onAdd();
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Add a task..."
          className="flex-1 bg-transparent border-0 outline-none font-light tracking-wide text-base"
          style={{
            fontSize: '16px',
            color: 'var(--text-primary)',
            paddingBottom: '12px',
          }}
          aria-label="New task"
        />
        {value.trim() && (
          <button
            onClick={onAdd}
            className="text-xs font-medium uppercase tracking-[0.15em] pb-3 shrink-0 focus-accent hover-text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
            style={{ color: 'var(--accent)' }}
            aria-label="Add task"
          >
            Add
          </button>
        )}
      </div>
      <div
        className="h-px w-full transition-colors duration-500"
        style={{
          background: focused ? 'var(--accent-muted)' : 'var(--border-subtle)',
        }}
      />
    </div>
  );
}
