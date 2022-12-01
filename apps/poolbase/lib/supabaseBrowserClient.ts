import type { Database } from '@/types/supabase';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default createBrowserSupabaseClient<Database>();
