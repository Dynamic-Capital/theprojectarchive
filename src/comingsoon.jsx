import React from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import './styles.css';

function ComingSoon() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.h1
        className="text-5xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Coming Soon
      </motion.h1>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ComingSoon />
  </React.StrictMode>
);
