"use client";
import { motion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ParallaxSection
      id="contact"
      image="/images/contact.svg"
      alt="Background image for Contact section"
    >
      <motion.h2
        className="text-3xl font-bold mb-4"
        variants={textVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        Contact
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        className="form max-w-md mx-auto text-left"
        variants={textVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" className="input" required />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className="textarea"
          rows="5"
          required
        />

        <motion.button
          type="submit"
          className="btn btn--primary mt-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
      </motion.form>
    </ParallaxSection>
  );
}
