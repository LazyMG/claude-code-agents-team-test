'use client';

import { useState, useEffect, useCallback } from 'react';
import TodoInput from './TodoInput';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => {
        if (data.todos) setTodos(data.todos);
      })
      .catch(console.error);
  }, []);

  const addTodo = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed }),
      });
      const data = await res.json();
      if (data.todo) {
        setTodos((prev) => [...prev, data.todo]);
        setInput('');
      }
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  }, [input]);

  const toggleTodo = useCallback(async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const data = await res.json();
      if (data.todo) {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? data.todo : t))
        );
      }
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  }, [todos]);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  }, []);

  const clearCompleted = useCallback(async () => {
    const completedTodos = todos.filter((t) => t.completed);
    try {
      await Promise.all(
        completedTodos.map((t) =>
          fetch(`/api/todos/${t.id}`, { method: 'DELETE' })
        )
      );
      setTodos((prev) => prev.filter((t) => !t.completed));
    } catch (err) {
      console.error('Failed to clear completed:', err);
    }
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-1">할 일 목록</h1>
        <p className="text-sm text-gray-400 mb-6">
          {remaining === 0 ? '모든 할 일을 완료했어요!' : `${remaining}개 남음`}
        </p>

        <TodoInput value={input} onChange={setInput} onAdd={addTodo} />
        <TodoFilter current={filter} onChange={setFilter} />
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />

        {todos.some((t) => t.completed) && (
          <button
            onClick={clearCompleted}
            className="mt-4 w-full text-xs text-gray-300 hover:text-red-400 transition"
          >
            완료된 항목 모두 삭제
          </button>
        )}
      </div>
    </div>
  );
}
