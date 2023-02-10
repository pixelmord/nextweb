import { NextSeo, NextSeoProps } from 'next-seo';

import meta from '@/config/meta';

export default function DefaultHeadTags({ overrides = {} }: { overrides?: Partial<NextSeoProps> }) {
  const updateMeta: NextSeoProps = {
    ...meta,
    themeColor: '#E2E8F0',
    ...overrides,
  };
  // TODO: Update with sane defaults, see html and pwa checklist
  return (
    <>
      <NextSeo {...updateMeta} useAppDir={true} />
      <link rel="alternate" type="application/rss+xml" href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.xml`} />
      <link rel="alternate" type="application/feed+json" href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.json`} />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />

      <meta content="/static/browserconfig.xml" name="msapplication-config" />
      <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
      <link href="/static/favicons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/static/favicons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/static/favicons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link color="#4a9885" href="/static/favicons/safari-pinned-tab.svg" rel="mask-icon" />
      <link href="/static/favicons/site.webmanifest" rel="manifest" />
    </>
  );
}
