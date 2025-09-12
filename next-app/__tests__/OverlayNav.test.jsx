import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OverlayNav from '../components/OverlayNav';

describe('OverlayNav', () => {
  it('renders links when open', () => {
    render(<OverlayNav open={true} onLink={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    const nav = screen.getByRole('navigation');
    expect(nav).not.toHaveAttribute('aria-hidden');
  });
});

