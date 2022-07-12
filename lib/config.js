module.exports = {
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGO_URI,

    jwt: {
        secret: process.env.SECRET,

        tokens: {
            access:{
                type: 'access',
                expiresIn: '60m'
            },

            refresh: {
                type: 'refresh',
                expiresIn: '120m'
            }
        }
    },

    session: {
        key: "sid",
        cookie: {
            path: "/",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        }
    }
}