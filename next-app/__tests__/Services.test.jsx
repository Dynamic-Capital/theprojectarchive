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

  it('updates images when the `images` prop changes', async () => {
    const initial = [{ src: 'https://example.com/a.jpg', alt: 'initial' }];
    const { rerender } = render(<Services images={initial} />);
    expect(screen.getByAltText('initial')).toBeInTheDocument();

    const updated = [{ src: 'https://example.com/b.jpg', alt: 'updated' }];
    rerender(<Services images={updated} />);
    await screen.findByAltText('updated');
    expect(screen.queryByAltText('initial')).not.toBeInTheDocument();
  });
});

