import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { expect, test, beforeAll } from 'vitest';

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('renders site header link', () => {
  render(<App />);
  expect(
    screen.getByRole('link', { name: /The Project Archive/i }),
  ).toBeInTheDocument();
});

test('renders starters section', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Starters/i })).toBeInTheDocument();
});

test('closes lightbox on Escape key', async () => {
  render(<App />);
  fireEvent.click(screen.getAllByAltText(/Gallery image/i)[0]);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'Escape' });
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
