export default function DefaultHeadTags() {
  return (
    <>
      <link rel="alternate" type="application/rss+xml" href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.xml`} />
      <link rel="alternate" type="application/feed+json" href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.json`} />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
