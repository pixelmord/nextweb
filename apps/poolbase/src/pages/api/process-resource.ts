import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Database, ResourceSchema } from 'src/types';

import scrapeHTML from '@/lib/processResource/scrapeHTML';

const URLDataSchema = ResourceSchema.pick({ id: true, url: true, processed: true });

const ProcessResourceRoute = async (req: NextApiRequest, res: NextApiResponse) => {
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
  let resourceDataResult;
  try {
    const validData = URLDataSchema.parse(req.body);
    if (!validData.processed?.includes('html')) {
      const { data: htmlData, screenshot } = await scrapeHTML(validData.url);
      const payload = {
        processed: [...(!!validData.processed ? validData.processed : []), 'html'],
        ...htmlData,
        status: 200,
      };

      const { error, data: resourceData } = await supabase
        .from('resources')
        .update(payload)
        .eq('id', validData.id)
        .select();
      console.debug(`Created in: ${Date.now() - start} ms`);
      if (error || !resourceData) {
        return res.status(500).json({ error: error.message });
      }
      const resource = resourceData[0];
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resources')
        .upload(`public/screenshots/${resource.id}.png`, screenshot, { upsert: true });
      if (uploadError || !uploadData) {
        return res.status(500).json({ error: uploadError.message });
      }
      const {
        data: { publicUrl },
      } = await supabase.storage.from('resources').getPublicUrl(uploadData.path);
      const { error: updateError, data } = await supabase
        .from('resources')
        .update({
          screenshot_storage_path: uploadData.path,
          screenshot_full_url: publicUrl,
          processed: [...(!!resource.processed ? resource.processed : []), 'screenshot'],
        })
        .eq('id', resource.id)
        .select();
      if (updateError) {
        return res.status(500).json({ error: updateError.message });
      }
      resourceDataResult = data;
    }

    const end = Date.now();
    return res.status(200).json({ message: `Created in: ${end - start} ms`, resourceDataResult });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e.message });
  }
};

export default ProcessResourceRoute;
