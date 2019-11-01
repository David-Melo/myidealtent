const withSass = require('@zeit/next-sass');

module.exports = withSass({
    publicRuntimeConfig: {
        staticFolder: '/static'
    },
    env: {
        API_HOST: process.env.API_HOST,
        API_KEY: process.env.API_KEY,
        STRIPE_KEY: process.env.STRIPE_KEY,
        CRYPT_KEY: process.env.CRYPT_KEY,
        CRYPT_TOKEN: process.env.CRYPT_TOKEN
    }
});
