'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import CurvedLoop from './CurvedLoopText.jsx';

const TICKER_TEXT = 'ALL YOU NEED IS THE PROJECT ARCHIVE';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#070707] px-6 py-20 text-center text-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduceMotion ? 0 : 0.6 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/paw-print.svg')] bg-repeat opacity-10"
      />

      {!reduceMotion && (
        <>
          <div className="absolute top-0 left-0 h-24 w-full overflow-hidden" aria-hidden="true">
            <CurvedLoop
              text={{
                text: TICKER_TEXT,
                font: {
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '700',
                  fontSize: 32,
                },
                color: '#fff',
              }}
              direction="right"
              baseVelocity={40}
              curveAmount={200}
              draggable={false}
              fade={false}
            />
          </div>
          <div className="absolute bottom-0 left-0 h-24 w-full overflow-hidden" aria-hidden="true">
            <CurvedLoop
              text={{
                text: TICKER_TEXT,
                font: {
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '700',
                  fontSize: 32,
                },
                color: '#fff',
              }}
              direction="left"
              baseVelocity={40}
              curveAmount={-200}
              draggable={false}
              fade={false}
            />
          </div>
        </>
      )}

      <div className="z-10 flex flex-col items-center">
        <Image
          src="/logo-light.svg"
          alt="Cat mascot"
          width={120}
          height={120}
          priority
          className="mb-6"
        />
        <h1 className="font-sans text-4xl font-bold uppercase">The Project Archive</h1>
        <p className="mt-4 text-lg text-muted">
          Where stories live forever 🐾
        </p>
        <div className="mt-8 flex gap-4">
          <motion.a
            href="#explore"
            className="rounded-md bg-brand px-6 py-3 font-semibold text-white"
            whileHover={reduceMotion ? undefined : { scale: 1.05, backgroundColor: '#d13200' }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            Explore Now
          </motion.a>
          <motion.a
            href="#learn"
            className="rounded-md border border-white px-6 py-3 font-semibold text-white"
            whileHover={reduceMotion ? undefined : { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            Learn More
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}

