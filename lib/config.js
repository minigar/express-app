module.exports = {
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGO_URI,

    jwt: {
        secret: process.env.SECRET,

        tokens: {
            access:{
                type: 'access',
                expiresIn: '15m'
            },

            refresh: {
                type: 'refresh',
                expiresIn: '25m'
            }
        }
    },

    session: {
        key: "sid",
        cookie: {
            path: "/",
            httpOnly: true,
            maxAge: null
        }
    }
}