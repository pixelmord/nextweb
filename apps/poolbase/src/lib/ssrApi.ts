import { Octokit } from 'octokit';

import { createClient } from './supabaseServerClient';

export async function createClientWithSession() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { session, supabase };
}

function handleError(error) {
  console.log(error);
  return null;
}

export async function fetchUserProfile() {
  const { session, supabase } = await createClientWithSession();
  if (!session) {
    return { data: null, error: new Error('No session') };
  }
  const { data, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();

  return { data, error };
}

export async function fetchIntegration(provider: string) {
  const { session, supabase } = await createClientWithSession();
  if (!session) {
    return { data: null, error: new Error('No session') };
  }
  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('uid', session.user.id)
    .eq('provider', provider)
    .single();

  return { data, error };
}
export const fetchGithubStars = async () => {
  const { data: integration, error } = await fetchIntegration('github');
  const octokit = new Octokit({ auth: integration.access_token });
  // const data = await octokit.paginate('GET /user/starred', { per_page: 100 });
  const data = await octokit.graphql<any>(
    `
    query viewerStars($cursor: String) {
      viewer {
        login
        starredRepositories(
          first: 100
          orderBy: {field: STARRED_AT, direction: DESC}
          after: $cursor
        ) {
          totalCount
          pageInfo {
            endCursor
            startCursor
            hasNextPage
          }
          nodes {
            id
            name
            nameWithOwner
            pushedAt
            description
            url
            openGraphImageUrl
            shortDescriptionHTML
            stargazerCount
          }
        }
      }
    }
    `,
    {
      cursor: '',
    }
  );

  return { data, error };
};

export async function fetchResources() {
  const { session, supabase } = await createClientWithSession();
  if (!session) {
    return { data: null, error: new Error('No session') };
  }
  const { data, error } = await supabase
    .from('resource_user')
    .select('created_at, resource_id(*)')
    .eq('user_id', session.user.id);
  return { data, error };
}
