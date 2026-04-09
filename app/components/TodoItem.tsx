'use client';

import { Todo } from './TodoApp';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-100 transition group">
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition ${
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-300 hover:border-indigo-400'
        }`}
        aria-label={todo.completed ? '미완료로 변경' : '완료로 변경'}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <span
        className={`flex-1 text-sm ${
          todo.completed ? 'line-through text-gray-300' : 'text-gray-700'
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-200 hover:text-red-400 transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label="삭제"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}
