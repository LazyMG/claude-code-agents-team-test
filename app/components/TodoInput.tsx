'use client';

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export default function TodoInput({ value, onChange, onAdd }: TodoInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onAdd();
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하세요..."
        className="flex-1 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300 transition"
        style={{ fontSize: '16px' }}
      />
      <button
        onClick={onAdd}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
      >
        추가
      </button>
    </div>
  );
}
