import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return { ...actual, useReducedMotion: () => true };
});

import TiltCard from '../components/TiltCard';

describe('TiltCard', () => {
  it('disables tilt when reduced motion is preferred', () => {
    const { container } = render(
      <TiltCard>
        <p>content</p>
      </TiltCard>
    );
    const card = container.firstChild;
    fireEvent.mouseMove(card, { clientX: 10, clientY: 10 });
    expect(card.style.transform).toBe('none');
  });
});
