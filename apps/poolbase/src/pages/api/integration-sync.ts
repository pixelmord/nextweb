import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from 'octokit';
import { Database, ResourceData } from 'src/types';

const IntegrationSync = async (req: NextApiRequest, res: NextApiResponse) => {
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
    const { data: integration, error } = await supabase
      .from('integrations')
      .select('*')
      .eq('uid', session.user.id)
      .eq('provider', 'github')
      .single();

    console.debug(`Created in: ${Date.now() - start} ms`);
    if (error) {
      return res.status(500).json({ error });
    }
    if (!integration) {
      return res.status(200).json({ total: 0, message: 'No integration found' });
    }
    const octokit = new Octokit({ auth: integration.access_token });
    const { cursor } = JSON.parse(req.body);
    console.log(cursor, typeof cursor);
    const starsData = await octokit.graphql<any>(
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
        cursor: cursor || '',
      }
    );
    const {
      viewer: {
        starredRepositories: {
          totalCount,
          pageInfo: { hasNextPage, endCursor },
          nodes: stars,
        },
      },
    } = starsData;
    if (+totalCount === 0) {
      return res.status(200).json({ total: 0, message: 'No stars found' });
    }
    const { data: resources, error: listError } = await supabase
      .from('resource_user')
      .select('created_at, resource_id(id,url)')
      .eq('user_id', session.user.id);
    if (listError) {
      console.error(listError);
      return res.status(500).json({ error: listError });
    }
    const star2ResourceConversion = (star: any): Partial<ResourceData> => ({
      url: star.url,
      title: star.nameWithOwner,
      meta_description: star.description,
      meta_title: star.name,
      main_image_url: star.openGraphImageUrl,
    });
    if (resources.length === 0) {
      // Create all resources
      const insertList = stars.map(star2ResourceConversion);
      const { error: insertError } = await supabase.from('resources').insert(insertList);
      if (insertError) {
        return res.status(500).json({ error: insertError.message });
      }
      return res
        .status(201)
        .json({ total: stars.length, hasNextPage, endCursor, message: `Created in: ${Date.now() - start} ms` });
    }
    const updateList = stars
      .filter(
        (n) =>
          !resources.some((n2) => {
            // todo: why can this be an array??
            if (Array.isArray(n2.resource_id)) {
              return n.url === n2.resource_id[0].url;
            } else {
              return n.url === n2.resource_id.url;
            }
          })
      )
      .map(star2ResourceConversion);
    const { error: insertError } = await supabase.from('resources').insert(updateList);
    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }
    return res
      .status(201)
      .json({ total: updateList.length, hasNextPage, endCursor, message: `Created in: ${Date.now() - start} ms` });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e.message });
  }
};

export default IntegrationSync;
