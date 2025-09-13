'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Button from './Button';

const TAGLINE = 'ALL YOU NEED IS THE PROJECT ARCHIVE — ';
const REPEATED_TAGLINE = TAGLINE.repeat(6);

const MotionLogo = motion.img;
const LOGO_URL =
  'https://kagbqkivpimlhhcvhmry.supabase.co/storage/v1/object/public/project-contents/TPA%20-%20Black%20Logo.svg';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#070707] px-6 md:px-16 text-center text-white"
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
          src={LOGO_URL}
          alt="The Project Archive logo"
          className="mb-6 h-24 w-24 md:h-32 md:w-32"
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
        <h1 className="font-sans text-4xl md:text-6xl font-bold uppercase">
          The Project Archive
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400">
          Where stories live forever 🐾
        </p>
        <div className="mt-8 flex gap-4 md:gap-6">
          <Button href="#explore">Explore Now</Button>
          <Button href="#learn" variant="secondary">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}

