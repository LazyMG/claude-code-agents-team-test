'use client';

import { Todo } from './TodoApp';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ul className="space-y-2">
      {todos.length === 0 && (
        <li className="text-center text-gray-300 py-8 text-sm">할 일이 없습니다</li>
      )}
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
