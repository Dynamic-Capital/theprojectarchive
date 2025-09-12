import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ServicesStack from '../components/ServicesStack';

describe('ServicesStack', () => {
  it('returns null when no items provided', () => {
    const { container } = render(<ServicesStack items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
