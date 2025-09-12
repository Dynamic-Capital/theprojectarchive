'use client';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/mission', label: 'Mission' },
  { to: '/approach', label: 'Approach' },
  { to: '/numbers', label: 'In Numbers' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

export default function DesktopNav() {
  return (
    <nav className={styles.desktopNav}>
      {links.map((l) => (
        <Link key={l.to} href={l.to}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
