import { render, screen } from '@testing-library/react';
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
      <ParallaxSection
        id="test"
        image="https://picsum.photos/id/1011/1600/900"
        alt="Sample background"
      >
        <p>Content</p>
      </ParallaxSection>
    );
    const wrapper = container.querySelector('section > div');
    expect(wrapper?.style.transform).toBe('none');
  });

  it('renders when alt text is omitted', () => {
    render(
      <ParallaxSection
        id="no-alt"
        image="https://picsum.photos/id/1011/1600/900"
      >
        <p>Visible content</p>
      </ParallaxSection>
    );
    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });
});
