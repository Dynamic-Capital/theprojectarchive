import Home from '../../components/Home';
import { notFound } from 'next/navigation';

const sections = [
  'about',
  'mission',
  'approach',
  'numbers',
  'services',
  'testimonials',
  'contact',
];

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default function SectionPage({ params }) {
  const section = params?.section;
  if (!section || !sections.includes(section)) {
    notFound();
  }
  return <Home />;
}

