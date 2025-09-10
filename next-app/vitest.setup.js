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

class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver;
window.scrollTo = vi.fn();
HTMLCanvasElement.prototype.getContext = vi.fn();
