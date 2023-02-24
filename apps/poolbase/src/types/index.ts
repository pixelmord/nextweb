import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from './supabase';

export * from './supabase';
export * from './models';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Scope = Database['public']['Tables']['scopes']['Row'];
export type Tag = Database['public']['Tables']['tags']['Row'];
export type Resource = Database['public']['Tables']['resources']['Row'];

export type TypedSupabaseClient = SupabaseClient<Database>;
export type IntegrationProviders = 'github' | 'linear' | 'notion';
