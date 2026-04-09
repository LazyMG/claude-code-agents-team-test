'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '우유 사기', completed: false },
    { id: 2, text: 'Next.js 공부하기', completed: true },
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTodo();
  };

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-1">할 일 목록</h1>
        <p className="text-sm text-gray-400 mb-6">
          {remaining === 0 ? '모든 할 일을 완료했어요!' : `${remaining}개 남음`}
        </p>

        {/* 입력 */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="할 일을 입력하세요..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-base outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
          <button
            onClick={addTodo}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            추가
          </button>
        </div>

        {/* 목록 */}
        <ul className="space-y-2">
          {todos.length === 0 && (
            <li className="text-center text-gray-300 py-8 text-sm">할 일이 없습니다</li>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-100 transition group"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition ${
                  todo.completed
                    ? 'bg-indigo-500 border-indigo-500'
                    : 'border-gray-300 hover:border-indigo-400'
                }`}
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
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-200 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {todos.some((t) => t.completed) && (
          <button
            onClick={() => setTodos(todos.filter((t) => !t.completed))}
            className="mt-4 w-full text-xs text-gray-300 hover:text-red-400 transition"
          >
            완료된 항목 모두 삭제
          </button>
        )}
      </div>
    </div>
  );
}
