import { cpSync, rmSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';

// Resolve the Next.js app root and project root
const root = resolve(new URL('..', import.meta.url).pathname);
const projectRoot = resolve(root, '..');

// Paths to Next.js build output
const nextStatic = join(root, '.next', 'static');
const nextServerApp = join(root, '.next', 'server', 'app');
const destRoot = join(projectRoot, '_static');

// Recreate the destination directory
rmSync(destRoot, { recursive: true, force: true });
mkdirSync(join(destRoot, '_next'), { recursive: true });

// Copy static assets and pre-rendered pages
cpSync(nextStatic, join(destRoot, '_next', 'static'), { recursive: true });
cpSync(nextServerApp, destRoot, { recursive: true });
