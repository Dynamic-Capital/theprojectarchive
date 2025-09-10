import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      {shouldReduceMotion ? (
        <p className="text-xl">Page not found</p>
      ) : (
        <img
          src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
          alt="Animated loop of a confused traveler searching for a missing page"
          className="w-64 h-64"
        />
      )}
      <motion.button
        onClick={() => navigate('/')}
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      >
        Go Home
      </motion.button>
    </motion.div>
  );
}
