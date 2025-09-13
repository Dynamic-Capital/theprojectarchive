import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { query, closePool } from '../db/index.js';

async function run() {
  const dir = new URL('../migrations', import.meta.url).pathname;
  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.sql'))
    .sort();
  for (const file of files) {
    const sql = readFileSync(join(dir, file), 'utf8');
    console.log(`Applying ${file}`);
    await query(sql);
  }
  await closePool();
}

run().catch((err) => {
  console.error('Migration failed', err);
  process.exit(1);
});
