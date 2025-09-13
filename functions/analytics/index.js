import { createClient } from '@supabase/supabase-js';
import pino from 'pino';

const logger = pino();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function main(context) {
  try {
    const body = await context.req.json();
    if (!supabase) {
      logger.error('Supabase client not configured');
      return { status: 500, body: 'Supabase not configured' };
    }

    const { event, data, url, userAgent } = body;
    const { error } = await supabase.from('analytics_logs').insert({
      event,
      data,
      url,
      user_agent: userAgent,
      created_at: new Date().toISOString(),
    });

    if (error) {
      logger.error({ err: error }, 'Failed to log analytics event');
      return { status: 500, body: error.message };
    }

    logger.info({ event, url }, 'Logged analytics event');
    return { status: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    logger.error({ err }, 'Unhandled error');
    return { status: 500, body: 'Internal error' };
  }
}
