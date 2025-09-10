import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from '../components/Contact';

describe('Contact', () => {
  it('renders heading', () => {
    render(<Contact />);
    expect(
      screen.getByRole('heading', { name: /contact/i })
    ).toBeInTheDocument();
  });
});

