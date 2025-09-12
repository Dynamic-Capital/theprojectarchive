'use client';
import { motion } from 'framer-motion';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 p-8">
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="relative h-6 overflow-hidden rounded-md bg-neutral-200 dark:bg-neutral-800"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear', delay: idx * 0.1 }}
          />
        </div>
      ))}
    </div>
  );
}
