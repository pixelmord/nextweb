import { Session } from '@supabase/auth-helpers-nextjs';
import { Octokit } from 'octokit';

import { createClient } from '../supabaseServerClient';
import {
  fetchIntegrationByProviderFactory,
  fetchIntegrationsFactory,
  fetchResourcesFactory,
  fetchScopesFactory,
  fetchUserProfileFactory,
} from './fetchers';

const supabase = createClient();

export const fetchUserProfile = fetchUserProfileFactory(supabase);
export const fetchIntegrationByProvider = fetchIntegrationByProviderFactory(supabase);
export const fetchResources = fetchResourcesFactory(supabase);
export const fetchScopes = fetchScopesFactory(supabase);
export const fetchIntegrations = fetchIntegrationsFactory(supabase);
export const fetchSession = () =>
  fetch('http://localhost:3002/api/session').then((res) => res.json()) as Promise<Session>;

export const fetchGithubStars = async (uid) => {
  const integration = await fetchIntegrationByProvider('github', uid);
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

  return data;
};
