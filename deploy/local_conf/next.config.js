module.exports = {
    reactStrictMode: true,
    distDir: 'build',
    env: {
        REACT_APP_SERVER_HOST: "localhost:8080",
        REACT_APP_SERVER_PROTOCOL: "http",
        RPC_URL: "https://polygon-mumbai.g.alchemy.com/v2/jA5_H_DQkGlOS4hChUOtyiBO3M1ckUVQ",
    },
   typescript: {ignoreBuildErrors: true,ignoreDuringBuilds: true,},
}
