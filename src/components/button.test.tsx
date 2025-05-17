import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  test('renders with correct content', () => {
    const content = 'Click me!';
    render(<Button>{content}</Button>);
    const button = screen.getByRole('button', { name: content });
    expect(button).toHaveTextContent(content);
  });

  test('calls an callback function on click', () => {
    const callbackFn = vi.fn();
    render(<Button onClick={callbackFn} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(callbackFn).toBeCalledTimes(1);
  });
});
