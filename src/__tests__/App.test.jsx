import { render, screen } from '@testing-library/react';
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
