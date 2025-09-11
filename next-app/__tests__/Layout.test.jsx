import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from '../components/Layout';

describe('Layout', () => {
  it('wraps children with responsive padding', () => {
    render(<Layout>content</Layout>);
    const main = screen.getByRole('main');
    expect(main).toHaveClass(
      'mx-auto',
      'max-w-screen-xl',
      'px-4',
      'sm:px-6',
      'lg:px-8'
    );
    expect(main).toHaveTextContent('content');
  });
});
