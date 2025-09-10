import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { expect, test } from 'vitest';
import { axe } from 'vitest-axe';
import { toHaveNoViolations } from 'vitest-axe/matchers';

expect.extend({ toHaveNoViolations });
test('menu button has accessible labels', async () => {
  const { container, rerender } = render(<Header onToggle={() => {}} open={false} />);
  expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  expect(await axe(container)).toHaveNoViolations();

  rerender(<Header onToggle={() => {}} open={true} />);
  expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
  expect(await axe(container)).toHaveNoViolations();
});
