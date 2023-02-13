module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui', 'mdx', 'utils'],
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['shiki'],
  },
};
