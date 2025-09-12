import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('renders footer element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders current year dynamically', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-12-31'));
    render(<Footer />);
    expect(screen.getByText(/2024/)).toBeInTheDocument();
    cleanup();
    vi.setSystemTime(new Date('2025-01-01'));
    render(<Footer />);
    expect(screen.getByText(/2025/)).toBeInTheDocument();
    vi.useRealTimers();
  });
});

