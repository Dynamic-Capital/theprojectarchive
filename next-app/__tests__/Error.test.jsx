import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Error from '../components/Error';

describe('Error', () => {
  it('renders error message', () => {
    render(<Error />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});

