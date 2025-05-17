import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { CounterPage, type CounterPageProps } from './counter.page';

describe('CounterPage', () => {
  const setup = (props?: CounterPageProps) => {
    render(<CounterPage {...props} />);

    const counter = screen.getByTestId('counter');
    const incrementButton = screen.getByRole('button', { name: '+' });
    const decrementButton = screen.getByRole('button', { name: '-' });

    return { counter, incrementButton, decrementButton };
  };

  test('default counter initial value is zero (0)', () => {
    const { counter } = setup();

    expect(counter).toHaveTextContent('0');
  });

  test('counter starts with initial value', () => {
    const initial = 40;
    const { counter } = setup({ initial });

    expect(counter).toHaveTextContent(initial.toString());
  });

  test('increment and decrement button are visible', () => {
    const { incrementButton, decrementButton } = setup();

    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();
  });

  test('user can increment the counter', async () => {
    const { counter, incrementButton } = setup();

    await userEvent.click(incrementButton);
    expect(counter).toHaveTextContent((1).toString());
  });

  test('user can decrement the counter', async () => {
    const { counter, decrementButton } = setup();

    await userEvent.click(decrementButton);
    expect(counter).toHaveTextContent((-1).toString());
  });

  test('user cannot increment beyond maximum value', async () => {
    const max = 2;
    const { counter, incrementButton } = setup({ max });

    await userEvent.tripleClick(incrementButton);
    expect(counter).toHaveTextContent(max.toString());
    expect(incrementButton).toBeDisabled();
  });

  test('user cannot decrement beyond minimum value', async () => {
    const min = -2;
    const { counter, decrementButton } = setup({ min });

    await userEvent.tripleClick(decrementButton);
    expect(counter).toHaveTextContent(min.toString());
    expect(decrementButton).toBeDisabled();
  });

  test('increment button is disabled at maximum and re-enables when below', async () => {
    const initial = 0;
    const min = -2;
    const max = 2;

    const { counter, incrementButton, decrementButton } = setup({
      initial,
      min,
      max,
    });

    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    expect(counter).toHaveTextContent(max.toString());
    expect(incrementButton).toBeDisabled();

    await userEvent.click(decrementButton);
    expect(counter).toHaveTextContent((max - 1).toString());
    expect(incrementButton).not.toBeDisabled();
  });

  test('decrement button is disabled at minimum and re-enables when above', async () => {
    const initial = 0;
    const min = -2;
    const max = 2;

    const { counter, incrementButton, decrementButton } = setup({
      initial,
      min,
      max,
    });

    await userEvent.click(decrementButton);
    await userEvent.click(decrementButton);
    expect(counter).toHaveTextContent((initial - 2).toString());
    expect(decrementButton).toBeDisabled();
    expect(incrementButton).not.toBeDisabled();
  });
});
