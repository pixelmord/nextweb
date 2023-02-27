import { Octokit } from 'octokit';

import { createClient } from '../supabaseServerClient';
import {
  fetchIntegrationByProviderFactory,
  fetchIntegrationsFactory,
  fetchResourcesFactory,
  fetchScopesFactory,
  fetchSessionFactory,
  fetchUserProfileFactory,
} from './fetchers';

export const fetchUserProfile = fetchUserProfileFactory(createClient);
export const fetchIntegrationByProvider = fetchIntegrationByProviderFactory(createClient);
export const fetchResources = fetchResourcesFactory(createClient);
export const fetchScopes = fetchScopesFactory(createClient);
export const fetchIntegrations = fetchIntegrationsFactory(createClient);
export const fetchSession = fetchSessionFactory(createClient);

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
