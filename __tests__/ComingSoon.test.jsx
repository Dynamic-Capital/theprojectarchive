import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ComingSoon from '../components/ComingSoon';

describe('ComingSoon', () => {
  it('renders heading', () => {
    render(<ComingSoon />);
    expect(screen.getByRole('heading', { name: /coming soon/i })).toBeInTheDocument();
  });
});
