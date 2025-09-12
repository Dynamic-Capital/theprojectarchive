'use client';
import { useScroll, useReducedMotion, motion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import ServiceCard from './ServiceCard';

// Tailwind helpers used below:
// .glass -> translucent card (add in globals if you don't have it yet)

export default function ServicesStack({ items = [], topOffsetClass = 'top-24' }) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);

  // Avoid rendering an empty section when no services are provided
  if (items.length === 0) {
    return null;
  }

  // Long container to allow scroll playtime (≈ one viewport per card)
  // Adjust factor (e.g., 0.85) to make the section shorter/longer.
  const sectionHeightVh = Math.max(1, items.length) * 90;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Precompute per-card progress slices
  const slices = useMemo(
    () =>
      items.map((_, i) => {
        const total = items.length;
        const start = i / total;          // when this card starts to appear
        const mid   = (i + 0.5) / total;  // fully visible
        const end   = (i + 1) / total;    // when it yields to next
        return { start, mid, end };
      }),
    [items]
  );

  if (prefersReduced) {
    // Accessible fallback: simple stacked list (no transforms)
    return (
      <section
        id="services"
        className="mx-auto max-w-7xl px-4 py-16"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in oklab, var(--brand-500), transparent 85%), color-mix(in oklab, var(--accent-500), transparent 95%))',
        }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold">Services</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <article key={i} className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted">{it.description}</p>
              {it.cta && (
                <a
                  href={it.href || '#contact'}
                  className="mt-4 inline-block rounded-full bg-accent/90 hover:bg-accent text-background px-4 py-2 text-sm whitespace-nowrap"
                >
                  {it.cta}
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
      ref={ref}
      className="relative"
      style={{
        height: `min(600vh, ${sectionHeightVh}vh)`,
        background:
          'linear-gradient(180deg, color-mix(in oklab, var(--brand-500), transparent 85%), color-mix(in oklab, var(--accent-500), transparent 95%))',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReduced ? 0 : 0.6 }}
    >
      {/* Pinned viewport for the stack */}
      <div className={`sticky ${topOffsetClass} h-[calc(100vh-6rem)]`}>
        <div className="relative h-full">
          {items.map((it, i) => (
            <ServiceCard
              key={i}
              index={i}
              item={it}
              slice={slices[i]}
              total={items.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

