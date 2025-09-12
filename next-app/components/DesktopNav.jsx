'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

const navVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { when: 'beforeChildren', staggerChildren: 0.05 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export default function DesktopNav() {
  return (
    <motion.nav
      className={styles.desktopNav}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {links.map((l) => (
        <motion.span
          key={l.to}
          variants={linkVariants}
          whileHover={{ scale: 1.05 }}
        >
          <Link href={l.to}>{l.label}</Link>
        </motion.span>
      ))}
    </motion.nav>
  );
}
