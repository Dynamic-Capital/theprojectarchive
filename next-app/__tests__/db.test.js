import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { newDb } from 'pg-mem';

const mem = newDb();
vi.mock('pg', () => {
  const pg = mem.adapters.createPg();
  return { ...pg, default: pg };
});

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
