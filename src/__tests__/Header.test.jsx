import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import Header from '../components/Header';
import { expect, test } from 'vitest';

test('renders menu button', () => {
  render(<Header onToggle={() => {}} open={false} />);
  expect(screen.getByLabelText(/Open menu/i)).toBeInTheDocument();
});

test('clicking hamburger toggles open state', () => {
  function Wrapper() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Header onToggle={() => setOpen((o) => !o)} open={open} />
        <span data-testid="state">{open ? 'open' : 'closed'}</span>
      </>
    );
  }
  render(<Wrapper />);
  const button = screen.getByLabelText(/Open menu/i);
  expect(screen.getByTestId('state')).toHaveTextContent('closed');
  fireEvent.click(button);
  expect(screen.getByTestId('state')).toHaveTextContent('open');
});
