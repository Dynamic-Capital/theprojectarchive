export const textVariants = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0 : 0.5 },
  },
});

export const spring = { type: 'spring', stiffness: 100, damping: 20 };

export const cardVariants = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: reduce ? { duration: 0 } : spring,
  },
});
