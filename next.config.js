/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/entries/:entry',
                destination: '/entries/:entry/1',
                permanent: true,
            }
        ]
    },
}

module.exports = nextConfig
