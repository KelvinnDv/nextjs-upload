/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            // {
            //     protocol: "https",
            //     hostname: "vlhp7vnbo3iooptf.public.blob.vercel-storage.com",
            // },
            {
                protocol: "https",
                hostname: "ovsyycftgdiyx8vh.public.blob.vercel-storage.com",
            },
        ],
    },
};

export default nextConfig;

// const nextConfig = {
//     images:{
//         remotePattern:[
//             {
//                 protocol: 'https',
//                 hostname:'',
//             }
//         ]
//     }
// };

// export default nextConfig;
// await import("./src/env.js");

// /** @type {import("next").NextConfig} */
// const config = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "github.com",
//       },
//     ],
//   },
// };

// export default config;

