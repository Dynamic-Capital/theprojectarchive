import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from '../components/Layout';

describe('Layout', () => {
  it('wraps children in a container', () => {
    render(<Layout>content</Layout>);
    const main = screen.getByRole('main');
    expect(main).toHaveClass('container');
    expect(main).toHaveTextContent('content');
  });
});
