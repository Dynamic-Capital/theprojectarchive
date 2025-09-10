import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { expect, test } from 'vitest';

test('renders menu button', () => {
  render(<Header onToggle={() => {}} open={false} />);
  expect(screen.getByLabelText(/Open menu/i)).toBeInTheDocument();
});
