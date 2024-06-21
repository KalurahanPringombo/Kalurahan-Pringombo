/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["desapringombo.gunungkidulkab.go.id", "utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
