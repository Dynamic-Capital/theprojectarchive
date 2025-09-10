import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Services from '../components/Services';

describe('Services', () => {
  it('renders heading', () => {
    render(<Services />);
    expect(
      screen.getByRole('heading', { name: /services/i })
    ).toBeInTheDocument();
  });
});

