"use client";
import { motion, useReducedMotion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import SectionHeader from './SectionHeader';
import Button from './Button';
import { textVariants } from '../lib/animations';

export default function About() {
  const reduceMotion = useReducedMotion();

  const stats = [
    { value: '5+', label: 'years of storytelling' },
    { value: '150+', label: 'projects delivered' },
    { value: '24', label: 'global clients' },
  ];

  return (
    <ParallaxSection
      id="about"
      image="/paw-print.svg"
      alt=""
      decorative
      overlay="rgba(7,7,7,0.9)"
      maxWidth="max-w-5xl"
    >
      <div className="flex flex-col items-center gap-12 px-4 py-24 md:flex-row md:gap-8 text-left">
        <div className="md:w-3/5">
          <SectionHeader title="Our Story">
            Founded in a small island studio, The Project Archive grew from a love of storytelling and a drive to capture life’s most vivid moments.
          </SectionHeader>
          <motion.p
            className="mt-4 max-w-prose"
            variants={textVariants(reduceMotion)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            Today, our team blends artistry and technology to craft visuals that inspire and connect.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-8"
            variants={textVariants(reduceMotion)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-sm uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
          <motion.div
            className="mt-8"
            variants={textVariants(reduceMotion)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Button href="/about">Learn More</Button>
          </motion.div>
        </div>
        <motion.div
          className="flex justify-center md:w-2/5"
          variants={textVariants(reduceMotion)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <img
            src="/about-illustration.svg"
            alt="Cat mascot illustration"
            className="w-full max-w-sm"
          />
        </motion.div>
      </div>
    </ParallaxSection>
  );
}

