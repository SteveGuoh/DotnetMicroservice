/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'cdn.pixabay.com'],
    },
    output: 'standalone',
};

export default nextConfig;
