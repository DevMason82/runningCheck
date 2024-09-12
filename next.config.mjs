/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@nextui-org/react", "@nextui-org/theme"],
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // ignoreBuildErrors: process.env.IS_VERCEL_ENV === "true",
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
