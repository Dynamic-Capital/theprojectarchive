'use client';

import { motion, useReducedMotion } from 'framer-motion';
import CatLogo from '../public/tpa-black-logo.svg';

const TAGLINE = 'ALL YOU NEED IS THE PROJECT ARCHIVE — ';
const REPEATED_TAGLINE = TAGLINE.repeat(6);

const MotionLogo = motion(CatLogo);

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#070707] px-6 text-center text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/paw-print.svg')] bg-repeat opacity-10"
      />

      {!reduceMotion && (
        <>
          <motion.svg
            viewBox="0 0 1500 500"
            className="absolute left-1/2 top-0 w-[1500px] -translate-x-1/2 text-white"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <path id="topCurve" d="M 0 250 Q 750 20 1500 250" fill="none" />
            <text style={{ fontSize: 32, fontWeight: 700 }} className="fill-white">
              <textPath href="#topCurve">{REPEATED_TAGLINE}</textPath>
            </text>
          </motion.svg>

          <motion.svg
            viewBox="0 0 1500 500"
            className="absolute bottom-0 left-1/2 w-[1500px] -translate-x-1/2 text-white"
            animate={{ x: ['0%', '50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <path id="bottomCurve" d="M 0 250 Q 750 480 1500 250" fill="none" />
            <text style={{ fontSize: 32, fontWeight: 700 }} className="fill-white">
              <textPath href="#bottomCurve">{REPEATED_TAGLINE}</textPath>
            </text>
          </motion.svg>
        </>
      )}

      <div className="z-10 flex flex-col items-center">
        <MotionLogo
          className="mb-6 h-24 w-24"
          animate={
            reduceMotion
              ? { rotate: 0, scale: 1 }
              : { rotate: 360, scale: [0.95, 1.05] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                }
          }
        />
        <h1 className="font-sans text-4xl font-bold uppercase">
          The Project Archive
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Where stories live forever 🐾
        </p>
        <div className="mt-8 flex gap-4">
          <motion.a
            href="#explore"
            className="rounded-md bg-[#f13d00] px-6 py-3 font-semibold text-white"
            whileHover={
              reduceMotion ? undefined : { scale: 1.05, opacity: 0.9 }
            }
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            Explore Now
          </motion.a>
          <motion.a
            href="#learn"
            className="rounded-md border border-white px-6 py-3 font-semibold text-white"
            whileHover={
              reduceMotion
                ? undefined
                : { scale: 1.05, backgroundColor: '#ffffff', color: '#000000' }
            }
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            Learn More
          </motion.a>
        </div>
      </div>
    </section>
  );
}

