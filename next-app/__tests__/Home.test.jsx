import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/')
}));

vi.mock('framer-motion', () => ({
  motion: { button: (props) => <button {...props} /> },
  useScroll: () => ({ scrollY: { on: vi.fn(), get: vi.fn(() => 0) } }),
  useTransform: () => 0,
  useReducedMotion: () => true
}));

vi.mock('../components/Hero', () => ({ default: () => <div>Hero</div> }));
vi.mock('../components/About', () => ({ default: () => <div>About</div> }));
vi.mock('../components/Mission', () => ({ default: () => <div>Mission</div> }));
vi.mock('../components/Approach', () => ({ default: () => <div>Approach</div> }));
vi.mock('../components/Numbers', () => ({ default: () => <div>Numbers</div> }));
vi.mock('../components/ServicesStack', () => ({
  default: () => <div>Services</div>
}));
vi.mock('../components/Testimonials', () => ({ default: () => <div>Testimonials</div> }));
vi.mock('../components/Contact', () => ({ default: () => <div>Contact</div> }));
vi.mock('../components/TiltCard', () => ({
  default: ({ children }) => <div>{children}</div>
}));

import Home from '../components/Home';

describe('Home', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    document.body.innerHTML = '<div id="contact"></div>';
    window.location.hash = '#contact';
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    window.location.hash = '';
  });

  it('scrolls to the hashed section on load instead of top', () => {
    const el = document.getElementById('contact');
    el.scrollIntoView = vi.fn();
    render(<Home />);
    expect(el.scrollIntoView).toHaveBeenCalled();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
