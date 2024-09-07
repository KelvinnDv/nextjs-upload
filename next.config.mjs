/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ovsyycftgdiyx8vh.public.blob.vercel-storage.com",
            },
        ],
    },
};

export default nextConfig;
