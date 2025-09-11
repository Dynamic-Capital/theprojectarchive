import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next/navigation', () => ({ notFound: vi.fn() }));
vi.mock('../components/Home', () => ({ default: () => <div>Home component</div> }));

import SectionPage, { generateStaticParams } from '../app/[section]/page';
import { notFound } from 'next/navigation';

beforeEach(() => {
  notFound.mockClear();
});

describe('SectionPage', () => {
  it('generates static params for all sections', () => {
    expect(generateStaticParams()).toEqual([
      { section: 'about' },
      { section: 'mission' },
      { section: 'approach' },
      { section: 'numbers' },
      { section: 'services' },
      { section: 'testimonials' },
      { section: 'contact' },
    ]);
  });

  it('calls notFound for unknown section', () => {
    SectionPage({ params: { section: 'unknown' } });
    expect(notFound).toHaveBeenCalled();
  });

  it('renders Home for a valid section', () => {
    render(<SectionPage params={{ section: 'about' }} />);
    expect(screen.getByText('Home component')).toBeInTheDocument();
    expect(notFound).not.toHaveBeenCalled();
  });
});
