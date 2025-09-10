import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  default: (props) => React.createElement('img', props),
}));

vi.mock('next/link', () => ({
  default: ({ children, ...props }) => React.createElement('a', props, children),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

vi.mock('focus-trap', () => ({
  createFocusTrap: () => ({ activate: vi.fn(), deactivate: vi.fn() }),
}));

class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver;
window.scrollTo = vi.fn();
HTMLCanvasElement.prototype.getContext = vi.fn();

if (!SVGElement.prototype.getComputedTextLength) {
  SVGElement.prototype.getComputedTextLength = () => 0;
}

if (!SVGElement.prototype.getTotalLength) {
  SVGElement.prototype.getTotalLength = () => 0;
}
