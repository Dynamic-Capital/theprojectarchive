import { existsSync } from 'node:fs';
import { cp, mkdir, rm } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = path.resolve(__dirname, '..');
const outDir = path.join(projectDir, 'out');
// Copy the static build output to the repository root so the buildpack can
// serve it via the web server configured in project.toml. Allow overriding the
// destination directory with STATIC_OUT_DIR for platforms that expect a
// different name (e.g. "dist" or "public"). Defaults to "_static".
const targetDir = path.resolve(
  projectDir,
  '..',
  process.env.STATIC_OUT_DIR ?? '_static',
);

try {
  console.log('Running next build...');
  try {
    execSync('next build', { cwd: projectDir, stdio: 'inherit' });
  } catch (error) {
    throw new Error(`next build failed: ${error.message}`);
  }

  if (!existsSync(outDir)) {
    throw new Error(
      'Missing out directory; ensure next.config.mjs sets output: "export"',
    );
  }

  await rm(targetDir, { recursive: true, force: true }).catch((err) => {
    throw new Error(`Failed to remove ${targetDir}: ${err.message}`);
  });
  await mkdir(targetDir, { recursive: true }).catch((err) => {
    throw new Error(`Failed to create ${targetDir}: ${err.message}`);
  });
  await cp(outDir, targetDir, { recursive: true }).catch((err) => {
    throw new Error(`Failed to copy files: ${err.message}`);
  });

  console.log(`Synced static files to ${targetDir}`);
} catch (err) {
  console.error(err);
  process.exit(1);
}
