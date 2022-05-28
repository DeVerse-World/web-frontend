module.exports = {
    reactStrictMode: true,
    distDir: 'build',
    env: {
        REACT_APP_SERVER_HOST: "api.deverse.world",
        REACT_APP_SERVER_PROTOCOL: "https",
        RPC_URL: "https://eth-rinkeby.alchemyapi.io/v2/dUWuuh70k7YsZXH4aoBoqkk8b_eB8Vyd",
    },
   typescript: {ignoreBuildErrors: true,ignoreDuringBuilds: true,},
}
