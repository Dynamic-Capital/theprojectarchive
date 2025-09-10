import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Approach from '../components/Approach';

describe('Approach', () => {
  it('renders heading', () => {
    render(<Approach />);
    expect(
      screen.getByRole('heading', { name: /approach/i })
    ).toBeInTheDocument();
  });
});

