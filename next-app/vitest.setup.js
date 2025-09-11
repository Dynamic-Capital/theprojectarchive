import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';

// next/image adds several props that aren't valid DOM attributes when
// rendered directly in tests. Strip those out before creating the `img`
// element to avoid React warnings during test runs.
vi.mock('next/image', () => ({
  default: ({ priority, fill, ...props }) => React.createElement('img', props),
}));

vi.mock('next/link', () => ({
  default: ({ children, ...props }) =>
    React.createElement('a', props, children),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/',
}));

// Mock react-three helpers that require WebGL APIs during tests
vi.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  Box: ({ children }) => React.createElement('group', null, children),
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
