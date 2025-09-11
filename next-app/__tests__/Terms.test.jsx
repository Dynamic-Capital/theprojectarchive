import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TermsPage from '../app/terms/page';

describe('TermsPage', () => {
  it('renders coming soon message', () => {
    render(<TermsPage />);
    expect(screen.getByRole('heading', { name: /coming soon/i })).toBeInTheDocument();
  });
});
