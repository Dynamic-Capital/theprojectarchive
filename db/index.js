import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.warn('[DB] DATABASE_URL is not set');
}

const pool = new pg.Pool({
  connectionString,
  max: parseInt(process.env.DATABASE_POOL_MAX || '10', 10),
  ssl:
    process.env.DATABASE_SSL === 'true'
      ? { rejectUnauthorized: false }
      : undefined,
});

export function query(text, params) {
  return pool.query(text, params);
}

export async function closePool() {
  await pool.end();
}

function handleExit(signal) {
  return async () => {
    try {
      await closePool();
    } finally {
      process.exit(0);
    }
  };
}

process.on('SIGINT', handleExit('SIGINT'));
process.on('SIGTERM', handleExit('SIGTERM'));

export default pool;
