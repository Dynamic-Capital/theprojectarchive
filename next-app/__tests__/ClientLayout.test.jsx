import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import ClientLayout from '../components/ClientLayout';

afterEach(cleanup);

describe('ClientLayout', () => {
  it('renders children', () => {
    render(
      <ClientLayout>
        <p>content</p>
      </ClientLayout>
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('includes a main region for accessibility', () => {
    render(
      <ClientLayout>
        <p>content</p>
      </ClientLayout>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

