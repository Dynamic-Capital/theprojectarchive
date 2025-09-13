#!/usr/bin/env node
import { performance } from 'node:perf_hooks';

function usage() {
  console.error('Usage: node scripts/uptime-monitor.js <url>');
}

const urlArg = process.argv[2];
const url = urlArg || process.env.SITE_URL;
if (!url) {
  usage();
  process.exit(1);
}

const start = performance.now();
try {
  let res = await fetch(url, { method: 'HEAD' });
  // fallback to GET if HEAD is not allowed
  if (res.status === 405) {
    res = await fetch(url, { method: 'GET' });
  }
  const duration = Math.round(performance.now() - start);
  console.log(`${url} -> ${res.status} in ${duration}ms`);
  const requiredHeaders = [
    'strict-transport-security',
    'content-security-policy',
    'x-frame-options',
    'x-content-type-options',
  ];
  const missing = requiredHeaders.filter(h => !res.headers.has(h));
  if (missing.length) {
    console.warn(`Missing security headers: ${missing.join(', ')}`);
  }
  process.exit(res.ok ? 0 : 1);
} catch (err) {
  console.error(`Request failed: ${err.message}`);
  process.exit(1);
}
