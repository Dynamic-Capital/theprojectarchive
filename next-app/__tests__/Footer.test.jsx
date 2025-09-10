import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('renders footer element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

