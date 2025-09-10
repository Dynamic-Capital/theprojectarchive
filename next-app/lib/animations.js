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

export const stackCardVariants = (i, reduce) => ({
  initial: {
    opacity: 0,
    scale: reduce ? 1 : 1 - i * 0.05,
    y: reduce ? 0 : i * -10,
  },
  animate: {
    opacity: 1,
    scale: reduce ? 1 : 1 - i * 0.05,
    y: reduce ? 0 : i * -10,
    transition: reduce
      ? { duration: 0 }
      : { type: 'spring', stiffness: 120, damping: 20, delay: i * 0.05 },
  },
});
