import type { NextSeoProps } from 'next-seo';

import common from './common';

export const meta: NextSeoProps = {
  title: common.title,
  canonical: common.url,
  description: common.tagline,
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: common.url,
    title: common.title,
    description: common.tagline,
    images: [
      {
        url: 'https://pixelmord.de/static/images/andreas-adam.png',
        width: 1080,
        height: 1080,
        alt: `${common.title} | ${common.tagline}`,
      },
    ],
    site_name: common.title,
  },
  twitter: {
    handle: '@pixelmord',
    site: '@pixelmord',
    cardType: 'summary_large_image',
  },
};
export default meta;
