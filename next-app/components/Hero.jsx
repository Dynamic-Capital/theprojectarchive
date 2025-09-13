'use client';
import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import CurvedLoop from './CurvedLoopText.jsx';
import Button from './Button';
import Hero3D from './Hero3D';

const HERO_TITLE = 'Crafting visual stories in the Maldives';
const HERO_TAGLINE = 'Design · Development · Photography';
const HERO_DESCRIPTION =
  'From websites to imagery, we bring ideas to life for brands that want to stand out.';
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const catOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.section
      ref={ref}
      id="home"
      className="scroll-mt-header"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 'var(--space-8)',
        textAlign: 'center',
        position: 'relative',
        y: reduceMotion ? 0 : y,
      }}
      variants={container}
      initial="show"
    >
      <Image
        src="https://picsum.photos/id/1004/1920/1080"
        alt="A creative workspace with a camera and photo prints on a desk"
        width={1920}
        height={1080}
        placeholder="blur"
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        sizes="100vw"
        priority
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, color-mix(in oklab, var(--brand-500), transparent 40%), color-mix(in oklab, var(--brand-600), transparent 90%))',
          zIndex: 1,
        }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '4rem',
          zIndex: 5,
          opacity: reduceMotion ? 1 : catOpacity,
          pointerEvents: 'none',
        }}
      >
        🐱
      </motion.div>
      <div
        className="mx-auto glass card w-full max-w-3xl lg:max-w-5xl"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/paw-print.svg')",
            backgroundRepeat: 'repeat',
            backgroundSize: '40px 40px',
            opacity: 0.1,
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
        <motion.h1
          style={{
            color: 'var(--brand-500)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--fs-2)',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textRendering: 'geometricPrecision',
          }}
          variants={itemUp(reduceMotion)}
        >
          {HERO_TITLE}
        </motion.h1>
        <motion.div
          style={{
            marginBottom: 'var(--space-4)',
            position: 'relative',
            height: '6rem',
            width: '100%',
            overflow: 'hidden',
          }}
          variants={itemUp(reduceMotion)}
          aria-hidden="true"
        >
          {reduceMotion ? (
            <span
              style={{
                color: 'var(--brand-500)',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--fs-1)',
                fontWeight: 400,
                letterSpacing: '0.1em',
                textRendering: 'geometricPrecision',
              }}
            >
              {HERO_TAGLINE}
            </span>
          ) : (
            <>
              <CurvedLoop
                text={{
                  text: HERO_TAGLINE,
                  font: {
                    fontFamily: 'var(--font-sans)',
                    fontWeight: '400',
                    fontSize: 24,
                  },
                  color: 'var(--brand-500)',
                }}
                direction="left"
                baseVelocity={50}
                curveAmount={200}
                draggable={false}
                fade={false}
              />
              <CurvedLoop
                text={{
                  text: HERO_TAGLINE,
                  font: {
                    fontFamily: 'var(--font-sans)',
                    fontWeight: '400',
                    fontSize: 24,
                  },
                  color: 'var(--brand-500)',
                }}
                direction="right"
                baseVelocity={50}
                curveAmount={-200}
                draggable={false}
                fade={false}
              />
            </>
          )}
        </motion.div>
        <Hero3D />
        <motion.p
          style={{
            fontSize: 'var(--fs-2)',
            color: 'var(--text)',
            marginBottom: 'var(--space-5)',
          }}
          variants={itemDown(reduceMotion)}
        >
          {HERO_DESCRIPTION}
        </motion.p>
        <motion.div
          className="cta-group"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            justifyContent: 'center',
          }}
          variants={ctaContainer}
        >
            <Button
              href="#contact"
              variant="brand3d"
              variants={itemDown(reduceMotion)}
              style={{
                fontSize: 'var(--fs-1)',
                padding: 'var(--space-3) var(--space-6)',
                fontWeight: 600,
              }}
            >
              Contact Us
            </Button>
            <Button
              href="#services"
              variant="primary"
              variants={itemDown(reduceMotion)}
              style={{
                fontSize: 'var(--fs-1)',
                padding: 'var(--space-3) var(--space-6)',
                fontWeight: 600,
              }}
            >
              Explore Portfolio
            </Button>
          </motion.div>
      </div>
    </motion.section>
  );
}
