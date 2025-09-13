import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../public/tpa-black-logo.svg', () => ({
  default: () => <svg />,
}));

import Hero from '../components/Hero';

describe('Hero', () => {
  it('renders title', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', {
        name: /the project archive/i,
      })
    ).toBeInTheDocument();
  });
});

