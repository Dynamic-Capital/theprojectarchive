import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useInView: () => true,
    animate: vi.fn((from, to, { onUpdate }) => {
      onUpdate(to);
      return { stop: vi.fn() };
    }),
    useReducedMotion: vi.fn(() => false),
  };
});

import Numbers from '../components/Numbers';
import { animate, useReducedMotion } from 'framer-motion';

describe('Numbers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useReducedMotion.mockReturnValue(false);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders section heading', () => {
    render(<Numbers />);
    expect(
      screen.getByRole('heading', { name: /in numbers/i })
    ).toBeInTheDocument();
  });

  it('renders counters with final values', () => {
    render(<Numbers />);
    expect(screen.getByLabelText('150 Projects')).toHaveTextContent('150');
    expect(screen.getByLabelText('85 Clients')).toHaveTextContent('85');
    expect(screen.getByLabelText('12 Awards')).toHaveTextContent('12');
  });

  it('renders animated icons for each stat', () => {
    render(<Numbers />);
    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByText('👥')).toBeInTheDocument();
    expect(screen.getByText('🏆')).toBeInTheDocument();
  });

  it('skips animation when reduced motion is enabled', () => {
    useReducedMotion.mockReturnValue(true);
    render(<Numbers />);
    expect(animate).not.toHaveBeenCalled();
    expect(screen.getByLabelText('150 Projects')).toHaveTextContent('150');
  });

  it('provides live region for counters', () => {
    render(<Numbers />);
    expect(screen.getByLabelText('150 Projects')).toHaveAttribute('aria-live', 'polite');
  });
});
