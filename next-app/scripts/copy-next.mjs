import { cpSync, rmSync } from 'fs';
import { join, resolve } from 'path';

// Resolve the Next.js app root and project root
const root = resolve(new URL('..', import.meta.url).pathname);
const projectRoot = resolve(root, '..');

// Paths to exported build output
const nextOut = join(root, 'out');
const destRoot = join(projectRoot, '_static');

// Recreate the destination directory and copy exported files
rmSync(destRoot, { recursive: true, force: true });
cpSync(nextOut, destRoot, { recursive: true });
