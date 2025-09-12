import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return { ...actual, useReducedMotion: vi.fn() };
});

vi.mock('@react-three/fiber', () => ({
  Canvas: (props) => <canvas {...props} />,
  useFrame: () => {},
}));

import Hero3D from '../components/Hero3D';
import { useReducedMotion } from 'framer-motion';

describe('Hero3D', () => {
  beforeEach(() => {
    useReducedMotion.mockReturnValue(false);
  });

  it('renders canvas when motion allowed', () => {
    const { container } = render(<Hero3D />);
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('renders placeholder when reduced motion preferred', () => {
    useReducedMotion.mockReturnValue(true);
    const { container } = render(<Hero3D />);
    expect(container.querySelector('canvas')).toBeNull();
  });
});
