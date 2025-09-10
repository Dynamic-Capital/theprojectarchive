import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return { ...actual, useReducedMotion: () => true };
});

import ParallaxSection from '../components/ParallaxSection';

describe('ParallaxSection', () => {
  it('disables parallax when reduced motion is preferred', () => {
    const { container } = render(
      <ParallaxSection id="test" image="/images/test.svg">
        <p>Content</p>
      </ParallaxSection>
    );
    const wrapper = container.querySelector('section > div');
    expect(wrapper?.style.transform).toBe('none');
  });
});
