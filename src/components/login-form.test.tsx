import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { LoginForm } from './login-form';

const onLoginFn = vi.fn();

const setup = () => {
  render(<LoginForm onLogin={onLoginFn} />);
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const submitButton = screen.getByRole('button', { name: 'Login' });

  return {
    emailInput,
    passwordInput,
    submitButton,
  };
};

describe('LoginForm', () => {
  const email = 'email@outlook.com';
  const password = 'senha123';

  const fillsForm = (emailInput: HTMLElement, passwordInput: HTMLElement) => {
    fireEvent.change(emailInput, {
      target: { value: email },
    });

    fireEvent.change(passwordInput, {
      target: { value: password },
    });
  };

  beforeEach(() => {
    onLoginFn.mockClear();
  });

  test('email and name inputs are visible', () => {
    const { emailInput, passwordInput } = setup();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('email input starts focused', () => {
    const { emailInput } = setup();
    expect(emailInput).toHaveFocus();
  });

  test('user does not submit with any empty input', () => {
    const { emailInput, submitButton } = setup();
    expect(submitButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: email } });
    expect(submitButton).toBeDisabled();
    expect(onLoginFn).not.toHaveBeenCalled();
  });

  test('user can type email and password', () => {
    const { emailInput, passwordInput } = setup();
    fillsForm(emailInput, passwordInput);
    expect(emailInput).toHaveValue(email);
    expect(passwordInput).toHaveValue(password);
  });

  test('user can fill and submit form', () => {
    const { emailInput, passwordInput } = setup();
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fillsForm(emailInput, passwordInput);

    fireEvent.click(submitButton);

    expect(onLoginFn).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
