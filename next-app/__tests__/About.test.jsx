import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../components/About';

describe('About', () => {
  it('renders heading', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', { name: /our story/i })
    ).toBeInTheDocument();
  });
});

