"use client";
import { motion, useReducedMotion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import { cardVariants } from '../lib/animations';

export default function Starters() {
  const starters = [
    {
      title: 'HTML static site starter',
      description:
        'Create a simple static website with control over front-end code and no dependencies.',
    },
    {
      title: 'Next.js starter',
      description:
        'Deploy a dynamic server-rendered full-stack web app that is SEO-friendly and fast loading.',
    },
    {
      title: 'Distributed job manager',
      description:
        'Run background jobs with a scalable queue system for data pipelines and scheduled tasks.',
    },
    {
      title:
        'Gradient Serverless Inference + Playwright MCP CUA Chat Template',
      description:
        'Combine serverless GPU inference with a Playwright-driven chat UI template.',
    },
    {
      title: 'Dockerfile starter',
      description:
        'Deploy a containerized app with control over runtime and dependencies.',
    },
    {
      title: 'Go starter',
      description:
        'Deploy a lightweight microservice, webhook, or simple backend API.',
    },
    {
      title: 'Node.js starter',
      description:
        'Build a custom and event-driven backend service with control over server logic and dependencies.',
    },
    {
      title: 'React starter',
      description:
        'Quickly launch a responsive single-page app with a modern frontend setup.',
    },
  ];

  const reduceMotion = useReducedMotion();
  return (
    <ParallaxSection
      id="starters"
      image="https://picsum.photos/1920/1080?random=26"
      alt="Background image for Starters section"
      title="Starters"
    >
      <div className="grid gap-4 max-w-3xl mx-auto sm:grid-cols-2">
        {starters.map((s) => (
          <motion.div
            key={s.title}
            className="p-4 glass rounded text-left"
            variants={cardVariants(reduceMotion)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
            <p className="text-sm">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </ParallaxSection>
  );
}
