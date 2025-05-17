import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import { CounterPage } from './counter.page';

const renderCounterPage = () => render(<CounterPage />);

describe('CounterPage', () => {
  beforeEach(() => renderCounterPage());

  test('starts with value zero', () =>
    expect(screen.getByTestId('counter')).toHaveTextContent('0'));

  test('increments the counter', () => {
    const incrementButton = screen.getByRole('button', { name: '+' });
    expect(incrementButton).toBeInTheDocument();
    fireEvent.click(incrementButton);
    expect(screen.getByTestId('counter')).toHaveTextContent('1');
  });

  test('decrements the counter', () => {
    const decrementButton = screen.getByRole('button', { name: '-' });
    expect(decrementButton).toBeInTheDocument();
    fireEvent.click(decrementButton);
    expect(screen.getByTestId('counter')).toHaveTextContent('-1');
  });
});
