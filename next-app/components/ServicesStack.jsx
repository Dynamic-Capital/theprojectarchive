'use client';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useMemo, useRef } from 'react';

// Tailwind helpers used below:
// .glass -> translucent card (add in globals if you don't have it yet)

export default function ServicesStack({ items = [], topOffsetClass = 'top-24' }) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);

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
      <section id="services" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Services</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <article key={i} className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted">{it.description}</p>
              {it.cta && (
                <a href={it.href || '#contact'} className="mt-4 inline-block rounded-full bg-accent/90 hover:bg-accent text-bg0 px-4 py-2 text-sm">
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
    <section id="services" ref={ref} className="relative" style={{ height: `min(600vh, ${sectionHeightVh}vh)` }}>
      {/* Pinned viewport for the stack */}
      <div className={`sticky ${topOffsetClass} h-[calc(100vh-6rem)]`}>
        <div className="relative h-full">
          {items.map((it, i) => {
            const { start, mid, end } = slices[i];

            // Animate each card within its slice
            const opacity = useTransform(scrollYProgress, [start, mid * 0.95, end], [0, 1, 1]);
            const scale   = useTransform(scrollYProgress, [start, mid], [0.94, 1]);
            const y       = useTransform(scrollYProgress, [start, end], [50, -30]);   // slight lift as it “locks in”
            const blur    = useTransform(scrollYProgress, [start, mid], ['blur(6px)', 'blur(0px)']);      // ease-in clarity

            return (
              <motion.article
                key={i}
                className="absolute inset-0 flex items-center justify-center px-4"
                style={{ zIndex: items.length - i }}
              >
                <motion.div
                  className="glass rounded-2xl max-w-3xl w-full p-8 md:p-10 shadow-glass bg-white/5"
                  style={{
                    opacity,
                    scale,
                    y,
                    filter: blur,
                  }}
                >
                  <div className="text-sm uppercase tracking-wide text-accent/90">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="mt-1 text-2xl md:text-3xl font-semibold">{it.title}</h3>
                  <p className="mt-3 text-sm md:text-base text-muted">{it.description}</p>

                  {it.points?.length ? (
                    <ul className="mt-4 grid gap-2 text-sm text-text/90 list-disc pl-5">
                      {it.points.map((p, k) => <li key={k}>{p}</li>)}
                    </ul>
                  ) : null}

                  {it.cta && (
                    <a
                      href={it.href || '#contact'}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent/90 hover:bg-accent text-bg0 px-5 py-2 text-sm font-medium"
                    >
                      {it.cta} <span aria-hidden>→</span>
                    </a>
                  )}
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

