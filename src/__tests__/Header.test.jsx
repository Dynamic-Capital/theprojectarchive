import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { axe } from 'vitest-axe';
import { toHaveNoViolations } from 'vitest-axe/matchers';

expect.extend({ toHaveNoViolations });
test('menu button has accessible labels', async () => {
  const { container, rerender } = render(
    <BrowserRouter>
      <Header onToggle={() => {}} open={false} />
    </BrowserRouter>
  );
  expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  expect(await axe(container)).toHaveNoViolations();

  rerender(
    <BrowserRouter>
      <Header onToggle={() => {}} open={true} />
    </BrowserRouter>
  );
  expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
  expect(await axe(container)).toHaveNoViolations();
});
