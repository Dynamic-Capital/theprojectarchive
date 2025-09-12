import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { startServer } from '../../server.js';
import { mkdirSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';
import http from 'http';

describe('server startup', () => {
  it('logs and exits on startup failure', async () => {
    const err = new Error('fail');
    const appMock = {
      prepare: vi.fn().mockRejectedValue(err),
      getRequestHandler: vi.fn(),
    };
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    await startServer(appMock);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to start server', err);
    expect(exitSpy).toHaveBeenCalledWith(1);
    consoleSpy.mockRestore();
    exitSpy.mockRestore();
  });
});

describe('static file handling', () => {
  const staticDir = join(process.cwd(), '_static');
  let server;
  let exitSpy;
  beforeAll(async () => {
    mkdirSync(staticDir, { recursive: true });
    writeFileSync(join(staticDir, 'index.html'), '<h1>hi</h1>');
    process.env.NODE_ENV = 'production';
    exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    server = await startServer();
  });
  afterAll(() => {
    server && server.close();
    rmSync(staticDir, { recursive: true, force: true });
    delete process.env.NODE_ENV;
    exitSpy.mockRestore();
  });

  it('rejects path traversal', async () => {
    await new Promise((resolve) => {
      http.get(
        {
          port: server.address().port,
          path: '/../server.js',
        },
        (res) => {
          expect(res.statusCode).toBe(403);
          res.resume();
          res.on('end', resolve);
        },
      );
    });
  });

  it('handles malformed URLs', async () => {
    await new Promise((resolve) => {
      http.get(
        {
          port: server.address().port,
          path: '/%E0%A4%A',
        },
        (res) => {
          expect(res.statusCode).toBe(404);
          res.resume();
          res.on('end', resolve);
        },
      );
    });
  });
});

describe('allowed origin handling', () => {
  it('blocks disallowed origins', async () => {
    const appMock = {
      prepare: vi.fn().mockResolvedValue(),
      getRequestHandler: vi.fn().mockReturnValue((req, res) => {
        res.end('ok');
      }),
    };
    process.env.NEXT_ALLOWED_ORIGIN = 'https://allowed.com';
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    const server = await startServer(appMock);

    const res = await fetch(`http://localhost:${server.address().port}`, {
      headers: { Origin: 'https://evil.com' },
    });
    expect(res.status).toBe(403);

    server.close();
    exitSpy.mockRestore();
    delete process.env.NEXT_ALLOWED_ORIGIN;
  });

  it('responds to preflight requests', async () => {
    const appMock = {
      prepare: vi.fn().mockResolvedValue(),
      getRequestHandler: vi.fn().mockReturnValue((req, res) => {
        res.end('ok');
      }),
    };
    process.env.NEXT_ALLOWED_ORIGIN = 'https://allowed.com';
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    const server = await startServer(appMock);

    const res = await fetch(`http://localhost:${server.address().port}`, {
      method: 'OPTIONS',
      headers: { Origin: 'https://allowed.com' },
    });
    expect(res.status).toBe(204);
    expect(res.headers.get('access-control-allow-origin')).toBe(
      'https://allowed.com',
    );
    expect(res.headers.get('access-control-allow-methods')).toBe(
      'GET,OPTIONS',
    );
    expect(res.headers.get('access-control-allow-headers')).toBe(
      'Content-Type',
    );
  
    server.close();
    exitSpy.mockRestore();
    delete process.env.NEXT_ALLOWED_ORIGIN;
  });
});

describe('static server preflight', () => {
  const staticDir = join(process.cwd(), '_static');
  let server;
  let exitSpy;
  beforeAll(async () => {
    mkdirSync(staticDir, { recursive: true });
    writeFileSync(join(staticDir, 'index.html'), '<h1>hi</h1>');
    process.env.NODE_ENV = 'production';
    process.env.NEXT_ALLOWED_ORIGIN = 'https://allowed.com';
    exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    server = await startServer();
  });
  afterAll(() => {
    server && server.close();
    rmSync(staticDir, { recursive: true, force: true });
    delete process.env.NODE_ENV;
    delete process.env.NEXT_ALLOWED_ORIGIN;
    exitSpy.mockRestore();
  });

  it('handles preflight', async () => {
    const res = await fetch(`http://localhost:${server.address().port}`, {
      method: 'OPTIONS',
      headers: { Origin: 'https://allowed.com' },
    });
    expect(res.status).toBe(204);
    expect(res.headers.get('access-control-allow-origin')).toBe(
      'https://allowed.com',
    );
    expect(res.headers.get('access-control-allow-methods')).toBe(
      'GET,OPTIONS',
    );
    expect(res.headers.get('access-control-allow-headers')).toBe(
      'Content-Type',
    );
  });
});
