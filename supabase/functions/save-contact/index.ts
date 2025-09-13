import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  try {
    const { name, email, message } = await req.json();
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceRoleKey) {
      return new Response('Missing Supabase configuration', { status: 500 });
    }
    const client = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await client
      .from('contact_messages')
      .insert({ name, email, message });
    if (error) {
      console.error('Failed to save contact message', error);
      return new Response('Database error', { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Unexpected error', err);
    return new Response('Invalid request', { status: 400 });
  }
});
