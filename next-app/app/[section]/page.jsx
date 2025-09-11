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

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default function SectionPage({ params }) {
  if (!sections.includes(params.section)) {
    notFound();
  }
  return <Home />;
}

