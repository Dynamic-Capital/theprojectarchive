import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Numbers from '../components/Numbers';

describe('Numbers', () => {
  it('renders section heading', () => {
    render(<Numbers />);
    expect(
      screen.getByRole('heading', { name: /in numbers/i })
    ).toBeInTheDocument();
  });
});

