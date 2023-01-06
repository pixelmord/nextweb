import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
const AddResourceRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Run queries with RLS on the server
  const { data: user } = await supabase.from('resources').select(`*`).eq('id', session.user.id).single();
  console.log(user, session);

  res.status(200).json({ user, session });
};

export default AddResourceRoute;
