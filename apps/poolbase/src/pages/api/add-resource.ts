import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Database, ResourceSchema } from 'src/types';

import scrapeHTML from '@/lib/processResource/scrapeHTML';

const URLDataSchema = ResourceSchema.pick({ url: true, title: true });

const AddResourceRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const start = Date.now();
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient<Database>({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const validData = URLDataSchema.parse(req.body);
    const { data: htmlData, screenshot } = await scrapeHTML(validData.url);
    const payload = {
      url: validData.url,
      title: validData.title,
      creator: session.user.id,
      ...Object.keys(htmlData).reduce(
        (acc, cur) => ({ ...acc, [cur.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase())]: htmlData[cur] }),
        {}
      ),
    };

    const { error, data: resourceData } = await supabase.from('resources').insert(payload).select();

    console.debug(`Created in: ${Date.now() - start} ms`);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    const {
      data: { path },
      error: uploadError,
    } = await supabase.storage
      .from('resources')
      .upload(`public/screenshots/${resourceData[0].id}.png`, screenshot, { upsert: true });
    if (uploadError) {
      return res.status(500).json({ error: uploadError.message });
    }
    const {
      data: { publicUrl },
    } = await supabase.storage.from('resources').getPublicUrl(path);
    const { error: updateError, data } = await supabase
      .from('resources')
      .update({
        screenshot_storage_path: path,
        screenshot_full_url: publicUrl,
        processed: [...resourceData[0].processed, 'screenshot'],
      })
      .eq('id', resourceData[0].id)
      .select();
    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }
    const end = Date.now();
    return res.status(201).json({ message: `Created in: ${end - start} ms`, data });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e.message });
  }
};

export default AddResourceRoute;
