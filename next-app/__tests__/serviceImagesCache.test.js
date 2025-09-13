import { describe, it, expect, beforeEach, vi } from 'vitest';

const store = new Map();
vi.mock('@upstash/redis', () => ({
  Redis: class {
    async get(key) {
      return store.get(key);
    }
    async set(key, val) {
      store.set(key, val);
    }
    async del(key) {
      store.delete(key);
    }
  },
}));

const listMock = vi.fn();
const getPublicUrlMock = vi.fn();
vi.mock('../lib/supabaseClient', () => ({
  supabaseClient: {
    storage: {
      from: () => ({ list: listMock, getPublicUrl: getPublicUrlMock }),
    },
  },
}));

describe('service image caching', () => {
  let getServiceImages, invalidateServiceImagesCache;
  beforeEach(async () => {
    store.clear();
    listMock.mockReset();
    getPublicUrlMock.mockReset();
    process.env.NEXT_PUBLIC_SUPABASE_BUCKET = 'bucket';
    process.env.UPSTASH_REDIS_REST_URL = 'http://localhost';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'token';
    vi.resetModules();
    ({ getServiceImages, invalidateServiceImagesCache } = await import('../lib/serviceImages.js'));
    listMock.mockResolvedValue({ data: [{ name: 'a.jpg' }], error: null });
    getPublicUrlMock.mockImplementation((name) => ({ data: { publicUrl: `https://example.com/${name}` } }));
  });

  it('caches results after first fetch', async () => {
    await getServiceImages();
    expect(listMock).toHaveBeenCalledTimes(1);
    await getServiceImages();
    expect(listMock).toHaveBeenCalledTimes(1);
  });

  it('invalidates cache', async () => {
    await getServiceImages();
    await invalidateServiceImagesCache();
    listMock.mockResolvedValue({ data: [{ name: 'b.jpg' }], error: null });
    await getServiceImages();
    expect(listMock).toHaveBeenCalledTimes(2);
  });
});
