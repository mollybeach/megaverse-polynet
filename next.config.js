/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Attempt to resolve Node.js specific modules
            config.resolve = {
                ...config.resolve,
                fallback: {
                    ...config.resolve.fallback,
                    async_hooks: false,
                    fs: false,
                    net: false,
                    tls: false,
                    child_process: false,
                },
                alias: {
                    ...config.resolve.alias,
                    'async_hooks': false,
                }
            };
        }
        return config;
    },
    // Add experimental features
    experimental: {
        // Enable edge runtime
        runtime: 'edge',
        // Disable server components for now
        serverComponents: false,
    }
}

module.exports = nextConfig