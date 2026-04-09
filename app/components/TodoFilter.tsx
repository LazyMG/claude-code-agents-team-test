'use client';

import { FilterType } from './TodoApp';

interface TodoFilterProps {
  current: FilterType;
  onChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export default function TodoFilter({ current, onChange }: TodoFilterProps) {
  return (
    <nav className="flex gap-6" role="tablist" aria-label="Filter tasks">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          role="tab"
          aria-selected={current === value}
          className={`relative text-xs uppercase tracking-[0.15em] font-medium pb-2 transition-colors duration-300 focus-accent min-h-[44px] flex items-end ${
            current === value ? '' : 'hover-text-secondary'
          }`}
          style={{
            color: current === value ? 'var(--text-primary)' : 'var(--text-ghost)',
          }}
        >
          {label}
          {current === value && (
            <span
              className="absolute bottom-0 left-0 w-full h-px animate-fade-in"
              style={{ background: 'var(--accent)' }}
            />
          )}
        </button>
      ))}
    </nav>
  );
}
