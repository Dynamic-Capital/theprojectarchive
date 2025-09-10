import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Mission from '../components/Mission';

describe('Mission', () => {
  it('renders heading', () => {
    render(<Mission />);
    expect(
      screen.getByRole('heading', { name: /mission/i })
    ).toBeInTheDocument();
  });
});

