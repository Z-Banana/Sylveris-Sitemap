/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko'],
    defaultLocale: 'en',
  },
};
module.exports = nextConfig;
