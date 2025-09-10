let logged = false;

export function logRuntimeInfo() {
  if (logged) return;
  const nodeVersion = process.version;
  const env = process.env.NODE_ENV || 'development';
  console.log(`[Runtime] Node ${nodeVersion} - ${env} mode`);
  logged = true;
}
