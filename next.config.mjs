/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "skillicons.dev" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
