'use client';
import { motion, useTransform, useReducedMotion } from 'framer-motion';

export default function ServiceCard({ index, item, slice, total, scrollYProgress }) {
  const { start, mid, end } = slice;
  const opacity = useTransform(scrollYProgress, [start, mid * 0.95, end], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [start, mid], [0.94, 1]);
  const y = useTransform(scrollYProgress, [start, end], [50, -30]);
  const blur = useTransform(scrollYProgress, [start, mid], ['blur(6px)', 'blur(0px)']);
  const rotate = useTransform(scrollYProgress, [start, mid, end], [index % 2 === 0 ? -8 : 8, 0, 0]);
  const shadow = useTransform(scrollYProgress, [start, mid, end], [
    '0px 0px 0px rgba(0,0,0,0)',
    '0px 16px 32px rgba(0,0,0,0.15)',
    '0px 16px 32px rgba(0,0,0,0.15)'
  ]);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="absolute inset-0 flex items-center justify-center px-4"
      style={{ zIndex: total - index }}
    >
      <motion.div
        className="glass rounded-2xl max-w-3xl w-full p-8 md:p-10 shadow-glass"
        style={{ opacity, scale, y, filter: blur, rotate, boxShadow: shadow }}
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      >
        <div className="text-sm uppercase tracking-wide text-accent/90">{String(index + 1).padStart(2, '0')}</div>
        <h3 className="mt-1 text-2xl md:text-3xl font-semibold">{item.title}</h3>
        <p className="mt-3 text-sm md:text-base text-muted">{item.description}</p>

        {item.points?.length ? (
          <ul className="mt-4 grid gap-2 text-sm text-text/90 list-disc pl-5">
            {item.points.map((p, k) => (
              <li key={k}>{p}</li>
            ))}
          </ul>
        ) : null}

        {item.cta && (
          <motion.a
            href={item.href || '#contact'}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent/90 hover:bg-accent text-background px-5 py-2 text-sm font-medium whitespace-nowrap"
            whileHover={reduceMotion ? undefined : { x: 4 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            {item.cta} <span aria-hidden>→</span>
          </motion.a>
        )}
      </motion.div>
    </motion.article>
  );
}
