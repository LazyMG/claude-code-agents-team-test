'use client';

import { Todo } from './TodoApp';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      className="group todo-row flex items-center gap-4 py-4 animate-fade-in-up"
      style={{ borderBottom: '1px solid var(--border-subtle)' }}
    >
      {/* Checkbox — 44px touch target */}
      <button
        onClick={() => onToggle(todo.id)}
        className="todo-check flex-shrink-0 flex items-center justify-center focus-accent"
        style={{
          width: '44px',
          height: '44px',
        }}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        <span
          className="w-[18px] h-[18px] rounded-full border flex items-center justify-center"
          style={{
            borderColor: todo.completed ? 'var(--accent-muted)' : 'var(--text-ghost)',
            background: todo.completed ? 'var(--accent-muted)' : 'transparent',
          }}
        >
          {todo.completed && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--bg-deep)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
      </button>

      {/* Text */}
      <span
        className={`flex-1 text-[15px] font-light leading-relaxed transition-colors duration-300 ${
          todo.completed ? 'todo-strike' : ''
        }`}
        style={{
          color: todo.completed ? 'var(--text-ghost)' : 'var(--text-primary)',
        }}
      >
        {todo.text}
      </span>

      {/* Delete — 44px touch target */}
      <button
        onClick={() => onDelete(todo.id)}
        className="todo-delete flex items-center justify-center focus-accent"
        style={{ width: '44px', height: '44px' }}
        aria-label="Delete task"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}
