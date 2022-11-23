if (process.env.NODE_ENV === 'development') {
  const { overrideConsole } = require('nodejs-better-console');

  overrideConsole();

  console.log('test console message from development');
}
module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['ui'],
    appDir: true,
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
