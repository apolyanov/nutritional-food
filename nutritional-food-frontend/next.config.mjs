const API_URL = process.env.NODE_ENV === 'development' ? process.env.DEV_API_URL : process.env.API_URL

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [{source: '/api/v1/:slug*', destination: `${API_URL}/v1/:slug*`}]
    },
    output: "standalone",
};

export default nextConfig;
