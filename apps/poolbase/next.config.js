if (process.env.NODE_ENV === 'development') {
  const { overrideConsole } = require('nodejs-better-console');

  overrideConsole();

  console.log('test console message from development');
}

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui', 'mdx', 'utils'],
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['shiki'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};
module.exports = nextConfig;
