/* eslint-disable @next/next/no-img-element */
import { FiExternalLink, FiTag } from 'react-icons/fi';
import { H2 } from 'ui';

import { Resource } from '@/types';

export const ResourceItem = ({ resource }: { resource: Resource }) => {
  return (
    <article className="flex rounded bg-white/10 dark:bg-black/10 shadow-md shadow-accent-900/30 outline-dashed outline-offset-2 outline-1 outline-accent-400/25 p-6 mb-8">
      <div className="mr-8 w-8 flex-shrink-0">
        {!!resource.meta_icon_url && (
          <img src={resource.meta_icon_url} alt={resource.title || 'favicon'} className="w-8 h-auto" />
        )}
      </div>
      <div>
        <H2 styling="h4" vspace="none">
          {resource.title}
          <a href={resource.url} className="inline-block" target="_blank" aria-label="link">
            <FiExternalLink className="inline-block ml-3 w-6 h-6 -mt-2" />
          </a>
        </H2>
        {resource.meta_keywords &&
          !!resource.meta_keywords?.length &&
          resource.meta_keywords?.map((tag, index) => (
            <span key={index} className="inline-block bg-primary-400/20 px-2 rounded mr-3 my-2 text-xs">
              <FiTag className="inline-block mr-1 text-accent-500" />
              {tag}
            </span>
          ))}
      </div>
    </article>
  );
};
export default ResourceItem;
