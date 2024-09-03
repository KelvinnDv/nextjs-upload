/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remottePattern:[
            {
                protocol: 'https',
                hostname:'',
            }
        ]
    }
};

export default nextConfig;

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

