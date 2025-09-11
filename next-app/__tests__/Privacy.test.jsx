import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PrivacyPage from '../app/privacy/page';

describe('PrivacyPage', () => {
  it('renders coming soon message', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { name: /coming soon/i })).toBeInTheDocument();
  });
});
