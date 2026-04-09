import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TodoItem from '@/app/components/TodoItem';

const baseTodo = {
  id: '1',
  text: '우유 사기',
  completed: false,
  createdAt: '2026-04-09T00:00:00.000Z',
};

describe('TodoItem', () => {
  it('renders todo text', () => {
    render(<TodoItem todo={baseTodo} onToggle={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('우유 사기')).toBeInTheDocument();
  });

  it('shows strikethrough when completed', () => {
    const completedTodo = { ...baseTodo, completed: true };
    render(<TodoItem todo={completedTodo} onToggle={jest.fn()} onDelete={jest.fn()} />);
    const span = screen.getByText('우유 사기');
    expect(span.className).toContain('todo-strike');
  });

  it('does not show strikethrough when not completed', () => {
    render(<TodoItem todo={baseTodo} onToggle={jest.fn()} onDelete={jest.fn()} />);
    const span = screen.getByText('우유 사기');
    expect(span.className).not.toContain('todo-strike');
  });

  it('calls onToggle when check button clicked', async () => {
    const onToggle = jest.fn();
    render(<TodoItem todo={baseTodo} onToggle={onToggle} onDelete={jest.fn()} />);
    const toggleBtn = screen.getByLabelText('Mark as complete');
    await userEvent.click(toggleBtn);
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button clicked', async () => {
    const onDelete = jest.fn();
    render(<TodoItem todo={baseTodo} onToggle={jest.fn()} onDelete={onDelete} />);
    const deleteBtn = screen.getByLabelText('Delete task');
    await userEvent.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
