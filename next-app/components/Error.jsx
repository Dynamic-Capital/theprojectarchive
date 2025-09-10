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
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        gap: 'var(--space-5)',
        padding: 'var(--space-4)',
        textAlign: 'center'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      <p style={{ fontSize: 'var(--fs-3)', fontWeight: 750 }}>Something went wrong</p>
      <Button onClick={handleClick} variant="primary">
        Try Again
      </Button>
    </motion.div>
  );
}

