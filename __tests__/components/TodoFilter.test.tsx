import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TodoFilter from '@/app/components/TodoFilter';

describe('TodoFilter', () => {
  it('renders all 3 filter buttons', () => {
    render(<TodoFilter current="all" onChange={jest.fn()} />);
    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('미완료')).toBeInTheDocument();
    expect(screen.getByText('완료')).toBeInTheDocument();
  });

  it('highlights current filter with indigo background', () => {
    render(<TodoFilter current="active" onChange={jest.fn()} />);
    const activeBtn = screen.getByText('미완료');
    expect(activeBtn.className).toContain('bg-indigo-500');

    const allBtn = screen.getByText('전체');
    expect(allBtn.className).not.toContain('bg-indigo-500');

    const completedBtn = screen.getByText('완료');
    expect(completedBtn.className).not.toContain('bg-indigo-500');
  });

  it('calls onChange with correct filter value on click', async () => {
    const onChange = jest.fn();
    render(<TodoFilter current="all" onChange={onChange} />);

    await userEvent.click(screen.getByText('미완료'));
    expect(onChange).toHaveBeenCalledWith('active');

    await userEvent.click(screen.getByText('완료'));
    expect(onChange).toHaveBeenCalledWith('completed');

    await userEvent.click(screen.getByText('전체'));
    expect(onChange).toHaveBeenCalledWith('all');
  });
});
