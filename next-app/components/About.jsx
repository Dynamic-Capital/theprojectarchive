"use client";
import { motion, useReducedMotion } from 'framer-motion';

export default function About() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
          viewport: { once: true },
        };

  const stats = [
    { value: '5+', label: 'years of storytelling' },
    { value: '150+', label: 'projects delivered' },
    { value: '24', label: 'global clients' },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-header relative overflow-hidden bg-[#070707] text-white"
    >
      <div className="absolute inset-0 bg-[url('/paw-print.svg')] bg-repeat opacity-10" />
      <div className="relative mx-auto flex min-h-[80dvh] w-full max-w-5xl flex-col items-center gap-12 px-4 py-24 md:min-h-[90dvh] md:flex-row md:gap-8">
        <div className="md:w-3/5">
          <motion.h2
            className="font-sans text-4xl font-bold uppercase"
            {...fadeUp(0)}
          >
            Our Story
          </motion.h2>
          <motion.p className="mt-6 max-w-prose" {...fadeUp(0.1)}>
            Founded in a small island studio, The Project Archive grew from a
            love of storytelling and a drive to capture life’s most vivid
            moments.
          </motion.p>
          <motion.p className="mt-4 max-w-prose" {...fadeUp(0.2)}>
            Today, our team blends artistry and technology to craft visuals that
            inspire and connect.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-8"
            {...fadeUp(0.3)}
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
          <motion.a
            href="/about"
            className="mt-8 inline-block rounded-md bg-[#f13d00] px-6 py-3 font-semibold text-white"
            {...fadeUp(0.4)}
          >
            Learn More
          </motion.a>
        </div>
        <div className="flex justify-center md:w-2/5">
          <img
            src="/about-illustration.svg"
            alt="Cat mascot illustration"
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </section>
  );
}

