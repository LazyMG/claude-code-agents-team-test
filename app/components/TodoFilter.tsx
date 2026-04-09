'use client';

import { FilterType } from './TodoApp';

interface TodoFilterProps {
  current: FilterType;
  onChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '미완료' },
  { value: 'completed', label: '완료' },
];

export default function TodoFilter({ current, onChange }: TodoFilterProps) {
  return (
    <div className="flex gap-2 mb-4">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            current === value
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
