import { describe, it, expect, beforeAll, afterAll } from 'vitest';

// Provide a fake connection string so the database module initializes.
process.env.DATABASE_URL = 'postgres://user:pass@localhost:5432/test';

async function loadDb() {
  return await import('../../db/index.js');
}

describe('database client', () => {
  let query, closePool;

  beforeAll(async () => {
    ({ query, closePool } = await loadDb());
    await query('CREATE TABLE test (id SERIAL PRIMARY KEY, name TEXT)');
  });

  afterAll(async () => {
    await closePool();
  });

  it('stores and retrieves data', async () => {
    await query('INSERT INTO test (name) VALUES ($1)', ['Alice']);
    const { rows } = await query('SELECT name FROM test');
    expect(rows[0].name).toBe('Alice');
  });
});
