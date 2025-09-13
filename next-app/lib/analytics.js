import { supabaseClient } from './supabaseClient';

export async function logEvent(event, data = {}) {
  if (!supabaseClient) return;
  try {
    await supabaseClient.functions.invoke('analytics', {
      body: {
        event,
        data,
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
    });
  } catch (err) {
    console.error('Failed to log event', err);
  }
}

export function logPageView() {
  return logEvent('page_view');
}

export function logMarketingEvent(action, details = {}) {
  return logEvent('marketing', { action, ...details });
}

export async function fetchAnalyticsReport() {
  if (!supabaseClient) return null;
  try {
    const { data, error } =
      await supabaseClient.functions.invoke('analytics-report');
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to fetch analytics report', err);
    return null;
  }
}
