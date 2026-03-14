/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/kaimaar',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
