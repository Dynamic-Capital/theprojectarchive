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

test('opens lightbox on image click and closes on Escape', async () => {
  render(<App />);
  fireEvent.click(screen.getByAltText('Gallery image 1'));
  expect(screen.getByAltText('Selected service image')).toBeInTheDocument();
  fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() =>
    expect(
      screen.queryByAltText('Selected service image'),
    ).not.toBeInTheDocument(),
  );
});
