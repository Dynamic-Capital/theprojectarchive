import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Testimonials from '../components/Testimonials';

describe('Testimonials', () => {
  it('cycles to next testimonial', async () => {
    render(<Testimonials />);
    expect(screen.getByText(/captured our vision/i)).toBeInTheDocument();
    const nextBtn = screen.getByLabelText(/next testimonial/i);
    fireEvent.click(nextBtn);
    expect(
      await screen.findByText(/professional, creative/i),
    ).toBeInTheDocument();
  });
});
