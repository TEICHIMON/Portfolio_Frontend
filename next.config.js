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
  // async redirects() {
  //   return [
  //     {
  //       source: "/api/:path",
  //       destination: "http://backend:3050",
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
