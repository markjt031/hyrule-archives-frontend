/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bucketeer-40b39d69-b399-4b6c-9880-1186a79b4b77.s3.amazonaws.com',
                port: '',
                pathname: '/*'
            }
        ]
    },
    headers: async()=>{
        return [
        {
            source: '/monsters/new',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store,'
                },
            ],
        },
        ]
    }
}

module.exports = nextConfig
