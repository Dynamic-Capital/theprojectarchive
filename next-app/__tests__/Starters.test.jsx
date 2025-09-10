import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Starters from '../components/Starters';

describe('Starters', () => {
  it('renders heading', () => {
    render(<Starters />);
    expect(
      screen.getByRole('heading', { name: /starters/i })
    ).toBeInTheDocument();
  });
});

