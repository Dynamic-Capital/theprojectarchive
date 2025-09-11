import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

const staticDir = resolve(process.cwd(), '_static');

try {
  await access(staticDir, constants.R_OK);
} catch {
  console.error('Static output directory "_static" not found. Run `npm run build` first.');
  process.exit(1);
}
