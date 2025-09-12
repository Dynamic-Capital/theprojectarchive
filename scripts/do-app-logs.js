#!/usr/bin/env node
import WebSocket from 'ws';

function usage() {
  console.error('Usage: DIGITALOCEAN_TOKEN=... node scripts/do-app-logs.js <app-id> <deployment-id> <component-name> [--type <type>] [--stream]');
}

const token = process.env.DIGITALOCEAN_TOKEN;
const args = process.argv.slice(2);
if (!token || args.length < 3) {
  usage();
  process.exit(1);
}

let [appId, deploymentId, componentName, ...rest] = args;
let type = 'run';
let stream = false;
for (let i = 0; i < rest.length; i++) {
  const arg = rest[i];
  if (arg === '--stream') {
    stream = true;
  } else if (arg === '--type' && rest[i + 1]) {
    type = rest[i + 1];
    i++;
  } else if (arg.startsWith('--type=')) {
    type = arg.split('=')[1];
  }
}

const endpoint = `https://api.digitalocean.com/v2/apps/${appId}/deployments/${deploymentId}/components/${componentName}/logs?type=${type}`;

const res = await fetch(endpoint, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

if (!res.ok) {
  console.error(`Request failed with status ${res.status}`);
  process.exit(1);
}

const data = await res.json();

if (Array.isArray(data.historic_urls)) {
  for (const entry of data.historic_urls) {
    const url = typeof entry === 'string' ? entry : entry.url;
    const histRes = await fetch(url);
    process.stdout.write(await histRes.text());
  }
}

if (stream && data.live_url) {
  const url = data.live_url.replace(/^https:/, 'wss:');
  const ws = new WebSocket(url);
  ws.on('message', msg => process.stdout.write(msg.toString()));
  ws.on('error', err => console.error(err));
}
