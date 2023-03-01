/* eslint-disable @next/next/no-img-element */
import { FiExternalLink } from 'react-icons/fi';
import { H2 } from 'ui';

import { Resource } from '@/types';

export const ResourceItem = ({ resource }: { resource: Resource }) => {
  return (
    <article className="flex rounded bg-white/10 dark:bg-black/10 shadow-md shadow-accent-900/30 outline-dashed outline-offset-2 outline-1 outline-accent-400/25 p-6 mb-8">
      <div>{!!resource.meta_icon_url && <img src={resource.meta_icon_url} alt={resource.title || 'favicon'} />}</div>
      <div>
        <H2 styling="h4" vspace="none">
          {resource.title}
          <a href={resource.url} className="inline-block" target="_blank" aria-label="link">
            <FiExternalLink className="inline-block ml-3 w-6 h-6 -mt-2" />
          </a>
        </H2>
        {resource.meta_keywords &&
          !!resource.meta_keywords?.length &&
          resource.meta_keywords?.map((kw) => (
            <span key={kw} className="text-base-300">
              {kw}
            </span>
          ))}
      </div>
    </article>
  );
};
export default ResourceItem;
