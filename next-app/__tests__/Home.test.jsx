import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { axe } from 'vitest-axe';
import Home from '../components/Home';

let mockPathname = '/';
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

vi.mock('focus-trap', () => ({
  createFocusTrap: (el, opts) => ({
    activate: () => {
      const selector = opts?.initialFocus;
      if (selector) el.querySelector(selector)?.focus();
    },
    deactivate: () => {},
  }),
}));

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('Home', () => {
  it('logs scroll errors', () => {
    mockPathname = '/about';
    const err = new Error('fail');
    vi.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView: () => {
        throw err;
      },
    });
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<Home />);
    expect(spy).toHaveBeenCalledWith('Scroll into view failed', err);
    spy.mockRestore();
  });

  it('traps focus within lightbox and has no accessibility violations', async () => {
    mockPathname = '/';
    const { container } = render(<Home />);
    const imgs = await screen.findAllByAltText('Gallery image 1');
    fireEvent.click(imgs[0]);
    const closeBtn = await screen.findByRole('button', { name: /close image/i });
    expect(document.activeElement).toBe(closeBtn);
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});
