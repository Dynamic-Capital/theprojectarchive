import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { expect, test, beforeAll } from 'vitest';

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('renders coming soon message on root', () => {
  window.history.pushState({}, '', '/');
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(
    screen.getByRole('heading', { name: /coming soon/i }),
  ).toBeInTheDocument();
});

test('renders site header link on /main', () => {
  window.history.pushState({}, '', '/main');
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(
    screen.getByRole('link', { name: /The Project Archive/i }),
  ).toBeInTheDocument();
});

test('renders starters section on /main', () => {
  window.history.pushState({}, '', '/main');
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(
    screen.getByRole('heading', { name: /Starters/i }),
  ).toBeInTheDocument();
});

test('closes lightbox on Escape key', async () => {
  window.history.pushState({}, '', '/main');
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  fireEvent.click(screen.getAllByAltText(/Gallery image/i)[0]);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'Escape' });
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
