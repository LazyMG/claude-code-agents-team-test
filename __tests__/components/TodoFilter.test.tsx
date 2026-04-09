import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TodoFilter from '@/app/components/TodoFilter';

describe('TodoFilter', () => {
  it('renders all 3 filter buttons', () => {
    render(<TodoFilter current="all" onChange={jest.fn()} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('highlights current filter with aria-selected', () => {
    render(<TodoFilter current="active" onChange={jest.fn()} />);
    const activeBtn = screen.getByText('Active');
    expect(activeBtn).toHaveAttribute('aria-selected', 'true');

    const allBtn = screen.getByText('All');
    expect(allBtn).toHaveAttribute('aria-selected', 'false');

    const doneBtn = screen.getByText('Done');
    expect(doneBtn).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange with correct filter value on click', async () => {
    const onChange = jest.fn();
    render(<TodoFilter current="all" onChange={onChange} />);

    await userEvent.click(screen.getByText('Active'));
    expect(onChange).toHaveBeenCalledWith('active');

    await userEvent.click(screen.getByText('Done'));
    expect(onChange).toHaveBeenCalledWith('completed');

    await userEvent.click(screen.getByText('All'));
    expect(onChange).toHaveBeenCalledWith('all');
  });
});
