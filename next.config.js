module.exports = {
    reactStrictMode: true,
    distDir: 'build',
    env: {
        REACT_APP_SERVER_HOST: "localhost:8080",
        REACT_APP_SERVER_PROTOCOL: "http",
        // RPC_URL: "localhost:8545"
    },
   typescript: {ignoreBuildErrors: true,ignoreDuringBuilds: true,},
}
