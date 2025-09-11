import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '../components/Button';

describe('Button', () => {
  it('defaults type to button when no href is provided', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('renders as a link when href is provided', () => {
    render(<Button href="/test">Go</Button>);
    const link = screen.getByRole('link', { name: /go/i });
    expect(link).toHaveAttribute('href', '/test');
  });
});
