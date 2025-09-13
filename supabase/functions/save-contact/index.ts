import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { SmtpClient } from 'https://deno.land/x/smtp@v0.11.0/mod.ts';

serve(async (req) => {
  try {
    const { name, email, message } = await req.json();
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const businessEmail = Deno.env.get('BUSINESS_EMAIL');
    const appPassword = Deno.env.get('BUSINESS_EMAIL_APP_PASSWORD');
    if (!supabaseUrl || !serviceRoleKey || !businessEmail || !appPassword) {
      return new Response('Missing configuration', { status: 500 });
    }
    const client = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await client
      .from('contact_messages')
      .insert({ name, email, message });
    if (error) {
      console.error('Failed to save contact message', error);
      return new Response('Database error', { status: 500 });
    }

    const smtp = new SmtpClient();
    try {
      await smtp.connectTLS({
        hostname: 'smtp.gmail.com',
        port: 465,
        username: businessEmail,
        password: appPassword,
      });
      await smtp.send({
        from: businessEmail,
        to: businessEmail,
        subject: `New contact from ${name}`,
        content: message,
        headers: { 'reply-to': email },
      });
      await smtp.close();
    } catch (err) {
      console.error('Failed to send email', err);
      return new Response('Email error', { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Unexpected error', err);
    return new Response('Invalid request', { status: 400 });
  }
});
