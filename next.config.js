module.exports = {
    reactStrictMode: true,
    compress: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'renderapi.s3.amazonaws.com',
                port: '',
                pathname: '**',
            }
        ],
    },
    distDir: 'build',
    env: {
        REACT_APP_SERVER_HOST: "api.staging.deverse.world",
        REACT_APP_SERVER_PROTOCOL: "https",
        RPC_URL: "https://polygon-mumbai.g.alchemy.com/v2/jA5_H_DQkGlOS4hChUOtyiBO3M1ckUVQ",
        GRAPH_URL: "https://api.thegraph.com/subgraphs/name/lth08091998/deverseassets",
        ENV_PREFIX: "staging_",
    },
    typescript: { ignoreBuildErrors: true, ignoreDuringBuilds: true, },
}