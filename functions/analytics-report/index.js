import { createClient } from '@supabase/supabase-js';
import pino from 'pino';

const logger = pino();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function main() {
  if (!supabase) {
    logger.error('Supabase client not configured');
    return { status: 500, body: 'Supabase not configured' };
  }

  const { data, error } = await supabase.from('analytics_logs').select('event');
  if (error) {
    logger.error({ err: error }, 'Failed to fetch analytics');
    return { status: 500, body: error.message };
  }

  const report = data.reduce((acc, row) => {
    acc[row.event] = (acc[row.event] || 0) + 1;
    return acc;
  }, {});

  logger.info('Generated analytics report');
  return { status: 200, body: JSON.stringify(report) };
}
