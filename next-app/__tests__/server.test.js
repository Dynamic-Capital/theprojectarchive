import { describe, it, expect, vi } from 'vitest';
import { startServer } from '../../server.js';

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
