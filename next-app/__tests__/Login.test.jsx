import { render, screen } from '@testing-library/react';
import LoginPage from '../app/login/page.jsx';
import { vi, describe, it, expect } from 'vitest';

vi.mock('../lib/supabaseClient.js', () => ({
  supabaseClient: { auth: { signInWithPassword: vi.fn() } },
}));

describe('Login page', () => {
  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
});
