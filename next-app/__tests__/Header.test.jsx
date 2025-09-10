import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../components/Header';

describe('Header', () => {
  it('renders site logo link', () => {
    render(<Header onToggle={vi.fn()} open={false} />);
    expect(
      screen.getByRole('link', { name: /the project archive/i })
    ).toBeInTheDocument();
  });
});

