import { supabaseServer } from '../../../lib/supabaseServer.js';
import { invalidateServiceImagesCache } from '../../../lib/serviceImages.js';

export async function POST(req) {
  if (!supabaseServer) {
    return Response.json({ error: 'Supabase not configured' }, { status: 500 });
  }
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;
  if (!bucket) {
    return Response.json({ error: 'Bucket not configured' }, { status: 500 });
  }

  if (
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    req.headers.get('authorization') !==
      `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
  ) {
    return new Response(null, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file || typeof file.name !== 'string') {
      return Response.json({ error: 'Missing file' }, { status: 400 });
    }
    const fileName = formData.get('name') || file.name;
    const arrayBuffer = await file.arrayBuffer();
    const { error } = await supabaseServer.storage
      .from(bucket)
      .upload(fileName, Buffer.from(arrayBuffer), {
        contentType: file.type,
        upsert: true,
      });
    if (error) {
      console.error('Upload failed', error);
      return Response.json({ error: 'Upload failed' }, { status: 500 });
    }

    await invalidateServiceImagesCache();

    const { data } = supabaseServer.storage
      .from(bucket)
      .getPublicUrl(fileName);
    return Response.json({ url: data.publicUrl }, { status: 201 });
  } catch (err) {
    console.error('Invalid upload request', err);
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
