import { existsSync } from 'node:fs';
import { cp, mkdir, rm } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = path.resolve(__dirname, '..');
const outDir = path.join(projectDir, 'out');
const targetDir = path.resolve(projectDir, '..', '_static');

if (!existsSync(outDir)) {
  console.log('Running next build...');
  execSync('next build', { cwd: projectDir, stdio: 'inherit' });
}

await rm(targetDir, { recursive: true, force: true });
await mkdir(targetDir, { recursive: true });
await cp(outDir, targetDir, { recursive: true });

console.log(`Synced static files to ${targetDir}`);
