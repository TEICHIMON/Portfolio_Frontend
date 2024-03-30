/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/api/:path",
        destination: "http://localhost:3000",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
