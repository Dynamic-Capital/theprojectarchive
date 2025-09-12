import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { axe } from 'vitest-axe';
import Home from '../components/Home';

let mockPathname = '/';
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
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

  it('renders without accessibility violations', async () => {
    mockPathname = '/';
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});
