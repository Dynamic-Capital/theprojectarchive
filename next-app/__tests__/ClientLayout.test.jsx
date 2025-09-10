import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ClientLayout from '../components/ClientLayout';

describe('ClientLayout', () => {
  it('renders children', () => {
    render(
      <ClientLayout>
        <p>content</p>
      </ClientLayout>
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});

