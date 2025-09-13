'use client';

import { motion, useReducedMotion, useMotionValue, useTransform } from 'framer-motion';
import { useCallback, type CSSProperties, type MouseEvent } from 'react';
import Button from './Button';
import SectionHeader from './SectionHeader';

type ServiceItem = {
  title: string;
  description: string;
  cta?: string;
  href?: string;
  icon?: string;
};

interface ServicesStackProps {
  items?: ServiceItem[];
}

const containerVariants = (reduce: boolean) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: reduce ? 0 : 0.15,
    },
  },
});

const cardVariants = (reduce: boolean) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0 : 0.4 },
  },
});

const cardClass = 'glass border border-white/20 rounded-2xl p-6 shadow-lg';

export default function ServicesStack({ items = [] }: ServicesStackProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set(e.clientX - rect.left - rect.width / 2);
      y.set(e.clientY - rect.top - rect.height / 2);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (items.length === 0) {
    return null;
  }

  // Accessible fallback without motion
  if (reduceMotion) {
    return (
      <section id="services" className="mx-auto max-w-5xl px-4 py-16">
        <SectionHeader title="Services" />
        <div className="mt-8 space-y-6">
          {items.map((item, i) => (
            <article key={i} className={cardClass}>
              <h3 className="flex items-center text-lg font-semibold">
                {item.icon && (
                  <span className="mr-2 text-xl" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
              {item.cta && (
                <Button
                  href={item.href || '#'}
                  className="mt-4 whitespace-nowrap"
                >
                  {item.cta}
                </Button>
              )}
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="services"
      className="mx-auto max-w-5xl px-4 py-16"
      variants={containerVariants(reduceMotion)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader title="Services" />
      <motion.div
        className="mt-8 space-y-6 md:space-y-0 md:relative md:perspective-[1000px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
      >
        {items.map((item, i) => (
          <motion.article
            key={i}
            variants={cardVariants(reduceMotion)}
            className={`${cardClass} md:translate-x-[var(--offset-x)] md:translate-y-[var(--offset-y)]`}
            style={{
              '--offset-x': `${i * 32}px`,
              '--offset-y': `${i * -24}px`,
              zIndex: items.length - i,
            } as CSSProperties}
            whileHover={{ y: -4, scale: 1.02, rotateX: 3 }}
          >
            <h3 className="flex items-center text-lg font-semibold">
              {item.icon && (
                <span className="mr-2 text-xl" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-muted">{item.description}</p>
            {item.cta && (
              <Button
                href={item.href || '#'}
                className="mt-4 whitespace-nowrap"
              >
                {item.cta}
              </Button>
            )}
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

