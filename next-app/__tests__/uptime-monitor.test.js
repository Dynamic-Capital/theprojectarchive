import { describe, it, expect } from 'vitest';
import { spawn } from 'child_process';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function runScript(url) {
  const script = resolve(__dirname, '../../scripts/uptime-monitor.js');
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [script, url]);
    let output = '';
    child.stdout.on('data', (d) => (output += d));
    child.stderr.on('data', (d) => (output += d));
    child.on('close', (code) => resolve({ code, output }));
  });
}

describe('uptime monitor script', () => {
  it('succeeds against a local server', async () => {
    const server = http
      .createServer((req, res) => {
        res.writeHead(200, {
          'strict-transport-security': 'max-age=31536000',
          'content-security-policy': "default-src 'self'",
          'x-frame-options': 'DENY',
          'x-content-type-options': 'nosniff',
        });
        res.end('ok');
      })
      .listen(0);
    await new Promise((r) => server.once('listening', r));
    const url = `http://localhost:${server.address().port}`;
    const { code, output } = await runScript(url);
    expect(code).toBe(0);
    expect(output).toMatch(new RegExp(`${url} -> 200`));
    await new Promise((r) => server.close(r));
  });
});
