module.exports = {
    reactStrictMode: true,
    distDir: 'build',
    env: {
        REACT_APP_SERVER_HOST: "api.staging.deverse.world",
        REACT_APP_SERVER_PROTOCOL: "https",
        GRAPH_URL: "https://api.thegraph.com/subgraphs/name/lth08091998/deverseassets",
        RPC_URL: "https://polygon-mumbai.g.alchemy.com/v2/jA5_H_DQkGlOS4hChUOtyiBO3M1ckUVQ",
    },
    typescript: { ignoreBuildErrors: true },
    // async redirects() {
    //     return [{
    //         source: '/alpha',
    //         destination: '/alpha/info',
    //         permanent: true
    //     }, {
    //         source: '/create',
    //         destination: '/create/avatar',
    //         permanent: true
    //     }]
    // }
}