'use client';

import { Todo } from './TodoApp';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="py-16 animate-fade-in">
        <p
          className="text-sm font-light italic"
          style={{
            fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
            color: 'var(--text-ghost)',
            fontSize: '1.1rem',
          }}
        >
          Nothing here yet.
        </p>
      </div>
    );
  }

  return (
    <ul className="stagger-list" role="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
