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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => {
        if (data.todos) setTodos(data.todos);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const addTodo = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
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
  }, [input]);

  const toggleTodo = useCallback(async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
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
  }, [todos]);

  const deleteTodo = useCallback(async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCompleted = useCallback(async () => {
    const completedTodos = todos.filter((t) => t.completed);
    await Promise.all(
      completedTodos.map((t) =>
        fetch(`/api/todos/${t.id}`, { method: 'DELETE' })
      )
    );
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const remaining = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);

  return (
    <div
      className="w-full max-w-[640px] px-6 sm:px-10 pt-16 sm:pt-24 pb-20 animate-fade-in"
      style={{ marginLeft: 'clamp(1rem, 8vw, 12rem)' }}
    >
      <header className="mb-14">
        <h1
          className="text-5xl sm:text-6xl font-light tracking-tight leading-none mb-3"
          style={{
            fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
            color: 'var(--text-primary)',
          }}
        >
          Things
        </h1>
        <p
          className="text-sm font-light tracking-wide"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {!loaded
            ? '\u00A0'
            : remaining === 0 && todos.length > 0
              ? 'Everything done.'
              : remaining === 0
                ? 'What needs your attention?'
                : `${remaining} remaining`}
        </p>
      </header>

      <section className="mb-12">
        <TodoInput value={input} onChange={setInput} onAdd={addTodo} />
      </section>

      <section>
        <div className="mb-8">
          <TodoFilter current={filter} onChange={setFilter} />
        </div>

        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />

        {hasCompleted && (
          <div className="mt-10 animate-fade-in">
            <button
              onClick={clearCompleted}
              className="hover-accent text-xs tracking-widest uppercase focus-accent"
              style={{ color: 'var(--text-ghost)' }}
            >
              Clear completed
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
