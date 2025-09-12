'use client';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  return (
    <LayoutGroup>
      <motion.nav
        className={styles.desktopNav}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <ul className={styles.desktopNavList}>
          {links.map((l) => {
            const isActive = pathname === l.to;
            return (
              <motion.li
                key={l.to}
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
                className={styles.desktopNavItem}
              >
                <Link href={l.to} aria-current={isActive ? 'page' : undefined}>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className={styles.underline}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>
    </LayoutGroup>
  );
}
