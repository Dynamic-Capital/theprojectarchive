import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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

