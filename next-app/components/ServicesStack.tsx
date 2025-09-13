'use client';

import { motion, useReducedMotion, useMotionValue, useTransform } from 'framer-motion';
import { useCallback, type CSSProperties, type MouseEvent } from 'react';

type ServiceItem = {
  title: string;
  description: string;
  cta?: string;
  href?: string;
};

interface ServicesStackProps {
  items?: ServiceItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

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
        <h2 className="text-2xl md:text-3xl font-semibold">Services</h2>
        <div className="mt-8 space-y-6">
          {items.map((item, i) => (
            <article
              key={i}
              className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
              {item.cta && (
                <a
                  href={item.href || '#'}
                  className="mt-4 inline-block rounded-full bg-accent/90 hover:bg-accent text-background px-4 py-2 text-sm whitespace-nowrap"
                >
                  {item.cta}
                </a>
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
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-2xl md:text-3xl font-semibold">Services</h2>
      <motion.div
        className="mt-8 space-y-6 md:space-y-0 md:relative md:perspective-[1000px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
      >
        {items.map((item, i) => (
          <motion.article
            key={i}
            variants={cardVariants}
            className={
              'bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg ' +
              'md:translate-x-[var(--offset-x)] md:translate-y-[var(--offset-y)]'
            }
            style={{
              '--offset-x': `${i * 32}px`,
              '--offset-y': `${i * -24}px`,
              zIndex: items.length - i,
            } as CSSProperties}
            whileHover={{ y: -4, scale: 1.02, rotateX: 3 }}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.description}</p>
            {item.cta && (
              <motion.a
                href={item.href || '#'}
                className="mt-4 inline-block rounded-full bg-accent/90 hover:bg-accent text-background px-4 py-2 text-sm whitespace-nowrap"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.cta}
              </motion.a>
            )}
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

