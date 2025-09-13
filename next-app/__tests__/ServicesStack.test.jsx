import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ServicesStack from '../components/ServicesStack';

describe('ServicesStack', () => {
  it('returns null when no items provided', () => {
    const { container } = render(<ServicesStack items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders CTA link with proper classes', () => {
    const items = [
      {
        title: 'Test',
        description: 'desc',
        cta: 'Book now',
        href: '#',
      },
    ];
    render(<ServicesStack items={items} />);
    const link = screen.getByRole('link', { name: /book now/i });
    expect(link).toHaveClass('button');
    expect(link).toHaveClass('button--primary');
  });
});
