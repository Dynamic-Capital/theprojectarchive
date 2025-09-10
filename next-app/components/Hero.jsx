"use client";
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import CurvedLoop from './CurvedLoopText.js';
import Hero3D from './Hero3D';
import Button from './Button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemUp = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : -20 },
  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6 } },
});

const itemDown = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 20 },
  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6 } },
});

const ctaContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section
      id="home"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative'
      }}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Image
        src="https://picsum.photos/1920/1080?random=11"
        alt="A creative workspace with a camera and photo prints on a desk"
        fill
        sizes="100vw"
        priority
        style={{ objectFit: 'cover' }}
      />
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'color-mix(in oklab, var(--bg), transparent 50%)',
          padding: 'var(--space-5)',
          borderRadius: 'var(--radius-md)',
          maxWidth: '36rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <motion.h1 className="sr-only" variants={itemUp(reduceMotion)}>
          We're a Creative studio capturing stories in the Maldives
        </motion.h1>
        <motion.div
          style={{ marginBottom: 'var(--space-4)' }}
          variants={itemUp(reduceMotion)}
          aria-hidden="true"
        >
          {reduceMotion ? (
            <span
              style={{
                color: 'var(--text)',
                fontSize: 'var(--fs-2)',
                letterSpacing: '0.1em'
              }}
            >
              We're a Creative studio capturing stories in the Maldives
            </span>
          ) : (
            <CurvedLoop
              text={{
                text: "We're a Creative studio capturing stories in the Maldives",
                font: { fontFamily: 'sans-serif', fontWeight: '400', fontSize: 32 },
                color: 'var(--text)'
              }}
              direction="left"
              baseVelocity={50}
              curveAmount={300}
              draggable={false}
              fade={false}
            />
          )}
        </motion.div>
        <Hero3D />
        <motion.p
          style={{
            fontSize: 'var(--fs-2)',
            color: 'var(--text)',
            marginBottom: 'var(--space-5)'
          }}
          variants={itemDown(reduceMotion)}
        >
          Your journey fuels our achievements. Together, we create an impact, one at a time.
        </motion.p>
        <motion.div
          className="cta-group"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            justifyContent: 'center'
          }}
          variants={ctaContainer}
        >
          <Button href="#services" variant="primary" variants={itemDown(reduceMotion)}>
            Explore Portfolio
          </Button>
          <Button href="#contact" variant="secondary" variants={itemDown(reduceMotion)}>
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
