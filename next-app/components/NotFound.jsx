"use client";
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const glitch = {
  initial: {
    textShadow: '0 0 0 #fff',
  },
  animate: {
    textShadow: [
      '0.05em 0 0 #ff00c1, -0.05em 0 0 #00fff9',
      '-0.05em -0.025em 0 #ff00c1, 0.05em 0.025em 0 #00fff9',
      '-0.05em 0 0 #ff00c1, 0.05em 0 0 #00fff9',
      '0.05em 0.025em 0 #ff00c1, -0.05em -0.025em 0 #00fff9',
      '0 0 0 #ff00c1, 0 0 0 #00fff9',
      '0 0 0 #fff',
    ],
    x: [0, -2, 2, -2, 2, 0],
    transition: {
      duration: 0.5,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 1,
    },
  },
};

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      {shouldReduceMotion ? (
        <p className="text-2xl font-bold">404 Not Found</p>
      ) : (
        <motion.h1
          className="text-6xl font-extrabold"
          variants={glitch}
          initial="initial"
          animate="animate"
        >
          404 Not Found
        </motion.h1>
      )}
      <motion.button
        onClick={() => router.push('/')}
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      >
        Go Home
      </motion.button>
    </motion.div>
  );
}
