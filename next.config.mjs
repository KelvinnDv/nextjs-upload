// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
};

export default config;

