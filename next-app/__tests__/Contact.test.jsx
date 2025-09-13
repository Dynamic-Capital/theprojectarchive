import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('@hcaptcha/react-hcaptcha', () => ({
  default: React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
      executeAsync: () => Promise.resolve('test-token'),
      resetCaptcha: () => {},
    }));
    return <div data-testid="hcaptcha-mock" />;
  }),
}));

import Contact from '../components/Contact';

describe('Contact', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders heading', () => {
    render(<Contact />);
    expect(
      screen.getByRole('heading', { name: /contact/i })
    ).toBeInTheDocument();
  });

  it('shows success message on submit', async () => {
    const origFetch = global.fetch;
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock;
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await screen.findByText(/message sent/i);
    expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.any(Object));
    global.fetch = origFetch;
  });

  it('shows error message on failure', async () => {
    const origFetch = global.fetch;
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    global.fetch = fetchMock;
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await screen.findByText(/failed to send message/i);
    global.fetch = origFetch;
  });

  it('renders quick email link', () => {
    render(<Contact />);
    expect(
      screen.getByRole('link', { name: /email us/i })
    ).toBeInTheDocument();
  });
});

