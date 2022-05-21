module.exports = {
    reactStrictMode: true,
    distDir: 'build',
    env: {
        REACT_APP_SERVER_HOST: "api.deverse.world",
        REACT_APP_SERVER_PROTOCOL: "https",
        // RPC_URL: "localhost:8545"
    },
   typescript: {ignoreBuildErrors: true,ignoreDuringBuilds: true,},
}
