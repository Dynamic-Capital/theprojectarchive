import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';

process.env.ALLOWED_ORIGINS = 'http://localhost:3000';
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// next/image adds several props that aren't valid DOM attributes when
// rendered directly in tests. Strip those out before creating the `img`
// element to avoid React warnings during test runs.
vi.mock('next/image', () => ({
  default: ({ priority, fill, blurDataURL, placeholder, ...props }) => {
    void priority;
    void fill;
    // `blurDataURL` and `placeholder` are Next.js specific props that
    // aren't valid on standard `img` elements. Strip them to avoid React
    // warnings about unknown DOM attributes during tests.
    void blurDataURL;
    void placeholder;
    return React.createElement('img', props);
  },
}));

vi.mock('next/link', () => ({
  default: ({ children, ...props }) => React.createElement('a', props, children),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/',
}));

class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver;
class MockResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;
window.scrollTo = vi.fn();
HTMLCanvasElement.prototype.getContext = vi.fn();

if (!SVGElement.prototype.getComputedTextLength) {
  SVGElement.prototype.getComputedTextLength = () => 0;
}

if (!SVGElement.prototype.getTotalLength) {
  SVGElement.prototype.getTotalLength = () => 0;
}
