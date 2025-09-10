"use client";
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from './Button';

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
      <Button onClick={handleClick} variant="primary">
        Try Again
      </Button>
    </motion.div>
  );
}

