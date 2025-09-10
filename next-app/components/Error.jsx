"use client";
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Error({ reset }) {
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  const handleClick = () => {
    if (reset) {
      reset();
    } else {
      router.push('/');
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      <p className="text-2xl font-bold">Something went wrong</p>
      <motion.button
        onClick={handleClick}
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      >
        Try Again
      </motion.button>
    </motion.div>
  );
}

