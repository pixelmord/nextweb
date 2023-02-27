import { Integration, Profile, Resource, Scope, Tag, TypedSupabaseClient } from '@/types';

type CreateClient = () => TypedSupabaseClient;

export const fetchSessionFactory = (createClient: CreateClient) => async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    console.error('No session');
  }
  return session;
};
export const fetchUserProfileFactory = (createClient: CreateClient) => async (uid: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('profiles').select('*').eq('id', uid).single();
  if (error) {
    console.error(error);
    return Promise.reject(error);
  }
  return data;
};

export type UpdateProfileData = Pick<
  Profile,
  'avatar_url' | 'avatar_storage_path' | 'full_name' | 'id' | 'username' | 'website'
>;
export const updateProfileFactory = (createClient: CreateClient) => async (data: UpdateProfileData) => {
  const supabase = createClient();
  const updates = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  const { data: profile, error } = await supabase.from('profiles').upsert(updates).select();
  if (error) {
    console.error(error);
    throw error;
  }
  return profile[0] || null;
};

export const logoutFactory = (createClient: CreateClient) => async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw error;
  }
};

export const fetchResourcesFactory = (createClient: CreateClient) => async (uid: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('resource_user').select('created_at, resource_id(*)').eq('user_id', uid);
  if (error) {
    console.error(error);
    throw error;
  }
  return data as { created_at: string; resource_id: Resource }[];
};
export const fetchScopesFactory = (createClient: CreateClient) => async (uid: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('scopes').select('*').eq('uid', uid);
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};
export type SaveScopeData = Pick<Scope, 'title' | 'image_storage_path' | 'image_url' | 'uid' | 'id'>;
export const saveScopeFactory = (createClient: CreateClient) => async (data: SaveScopeData) => {
  const supabase = createClient();
  const updates = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  const { data: scope, error } = await supabase.from('scopes').upsert(updates).select();
  if (error) {
    console.error(error);
    throw error;
  }
  return scope[0];
};

export const fetchIntegrationsFactory = (createClient: CreateClient) => async (uid: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('integrations').select('*').eq('uid', uid);

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};
export const fetchIntegrationByProviderFactory =
  (createClient: CreateClient) => async (provider: string, uid: string) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .eq('uid', uid)
      .eq('provider', provider)
      .single();

    if (error) {
      console.error(error);
      throw error;
    }
    return data;
  };

export type SaveIntegrationData = Pick<Integration, 'display_name' | 'api_username' | 'access_token'>;
export const saveIntegrationFactory = (createClient: CreateClient) => async (data: SaveIntegrationData) => {
  const supabase = createClient();
  const updates = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  const { data: integration, error } = await supabase.from('integrations').upsert(updates).select();
  if (error) {
    console.error(error);
    throw error;
  }
  return integration[0];
};

export const fetchTagsFactory = (createClient: CreateClient) => async (uid: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('tags').select('*').eq('uid', uid);
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};
export type SaveTagData = Pick<Tag, 'title' | 'image_storage_path' | 'image_url' | 'uid' | 'id'>;
export const saveTagFactory = (createClient: CreateClient) => async (data: SaveTagData) => {
  const supabase = createClient();
  const updates = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  const { data: tag, error } = await supabase.from('tags').upsert(updates).select();
  if (error) {
    console.error(error);
    throw error;
  }
  return tag[0];
};
