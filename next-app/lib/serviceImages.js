import { supabaseClient } from './supabaseClient.js';
import { Redis } from '@upstash/redis';

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const FALLBACK_IMAGES = [
  {
    src: 'https://picsum.photos/400/300?random=31',
    alt: 'Bride and groom pose on a sunny beach during a wedding shoot',
  },
  {
    src: 'https://picsum.photos/400/300?random=32',
    alt: 'Product photo of a wristwatch on a wooden table',
  },
  {
    src: 'https://picsum.photos/400/300?random=33',
    alt: 'Aerial drone shot of a tropical island resort',
  },
  {
    src: 'https://picsum.photos/400/300?random=34',
    alt: 'Corporate portrait of a smiling entrepreneur in an office',
  },
  {
    src: 'https://picsum.photos/400/300?random=35',
    alt: 'Interior photo of a modern workspace with natural light',
  },
  {
    src: 'https://picsum.photos/400/300?random=36',
    alt: 'Food photography of a gourmet dish on a plate',
  },
];

const CACHE_KEY = 'service-images';

export async function getServiceImages() {
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;
  if (!bucket || !supabaseClient) {
    return FALLBACK_IMAGES;
  }

  try {
    if (redis) {
      const cached = await redis.get(CACHE_KEY);
      if (cached) return cached;
    }

    const { data, error } = await supabaseClient.storage.from(bucket).list();
    if (error || !data || data.length === 0) {
      return FALLBACK_IMAGES;
    }

    const images = data.map((file) => {
      const { data: urlData } = supabaseClient.storage
        .from(bucket)
        .getPublicUrl(file.name);
      return {
        src: urlData.publicUrl,
        alt:
          file.metadata?.description ||
          file.name.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ''),
        width: file.metadata?.width || 400,
        height: file.metadata?.height || 300,
      };
    });

    if (redis) {
      await redis.set(CACHE_KEY, images);
    }

    return images;
  } catch (err) {
    console.error('Failed to load service images', err);
    return FALLBACK_IMAGES;
  }
}

export async function invalidateServiceImagesCache() {
  if (redis) {
    await redis.del(CACHE_KEY);
  }
}

export { FALLBACK_IMAGES };
